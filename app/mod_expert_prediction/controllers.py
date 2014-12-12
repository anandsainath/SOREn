from __future__ import division
#Flask dependencies
from flask import Blueprint, request
import pymysql
import operator
import pandas as pd
import simplejson
from collections import Counter

# Define the blueprint: 'data', set its url prefix: app.url/data
mod_expert_prediction = Blueprint('expert-prediction', __name__, url_prefix='/expert-prediction')

conn = pymysql.connect(host='127.0.0.1', user='root', passwd='', db='soren') 

def count_many(needles, haystack):
    count = Counter(haystack.split())
    return {key: count[key] for key in count if key in needles} 

@mod_expert_prediction.route('/predict', methods=['POST'])
def index():

	body = request.form
	tags_list = request.form['tags']
	title = request.form['title']
	body = request.form['body']
	tags = [tag_item.strip().lower() for tag_item in tags_list.split(',')]

	text = body +" "+ title
	text = text.lower()

	counter = count_many(tags, text)
	total_denominator = sum([counter[key] for key in tags if key in counter])
	weights = []

	for key in tags:
		if key in counter:
			weights.append(counter[key]/total_denominator)
		else:
			weights.append(0)

	print tags, weights
	cur = conn.cursor()
	user_list = {}
	user_tag_list = {}
	# for k in range(len(tags)):
	k=0
	for tag_item in tags:
		cur.execute("SELECT max(Rank) FROM top_expert_users where tag = '%s'" % (tag_item))	
		r = cur.fetchall()
		max_val = int(r[0][0])+1
		cur.execute("SELECT User_id, ("+str(max_val)+" - Rank) FROM top_expert_users where tag = '%s'" % (tag_item))	
		r = cur.fetchall()
		for record in r:
			if(user_list.has_key(record[0])):
				user_list[record[0]] = user_list[record[0]] + int(record[1])*weights[k]
				user_tag_list[record[0]] = user_tag_list[record[0]]+"|"+tags[k]
			else:
				user_list[record[0]] = int(record[1])*weights[k];	
				user_tag_list[record[0]] = tags[k]
		k+=1
	sorted_users = sorted(user_list.items(), key=operator.itemgetter(1))
	user_count = min(20, len(sorted_users));

	user_ids = ','.join(user_id[0] for user_id in sorted_users[0:user_count])

	cur.execute("select *  from users where Id in ("+user_ids+")")
	r = cur.fetchall()

	return_data = []
	for user_record in r:
		user = {}
		user["user_id"] = user_record[0];
		user["reputation"] = user_record[1];
		user["Name"] = user_record[2];
		user["url"] = user_record[3];
		user["location"] = user_record[4];
		user["upvotes"] = user_record[5];
		user["downvotes"] = user_record[6];
		user["imageURL"] = user_record[7];
		user["tags"] = user_tag_list[user_record[0]]
		return_data.append(user);

	# for k in range(len(tags)):
	k=0
	for tag_item in tags:
		cur.execute("SELECT max(Rank) FROM top_fastest_users where tag = '%s'" % (tag_item))	
		r = cur.fetchall()
		max_val = int(r[0][0])+1
		cur.execute("SELECT User_id, ("+str(max_val)+" - Rank) FROM top_fastest_users where tag = '%s'" % (tag_item))	
		r = cur.fetchall()
		for record in r:
			if(user_list.has_key(record[0])):
				user_list[record[0]] = user_list[record[0]] + int(record[1])*weights[k]
				user_tag_list[record[0]] = user_tag_list[record[0]]+"|"+tags[k]
			else:
				user_list[record[0]] = int(record[1])*weights[k];	
				user_tag_list[record[0]] = tags[k]
		k += 1
	sorted_users = sorted(user_list.items(), key=operator.itemgetter(1))
	user_count = min(20, len(sorted_users));

	user_ids = ','.join(user_id[0] for user_id in sorted_users[0:user_count])

	cur.execute("select *  from users where Id in ("+user_ids+")")
	r = cur.fetchall()

	return_fast_data = []	
	for user_record in r:
		user = {}
		user["user_id"] = user_record[0];
		user["reputation"] = user_record[1];
		user["Name"] = user_record[2];
		user["url"] = user_record[3];
		user["location"] = user_record[4];
		user["upvotes"] = user_record[5];
		user["downvotes"] = user_record[6];
		user["imageURL"] = user_record[7];
		user["tags"] = user_tag_list[user_record[0]]
		return_fast_data.append(user);

	# cur.close()
	# conn.close()
	return simplejson.dumps({"fastest":return_fast_data,"authoritative":return_data});