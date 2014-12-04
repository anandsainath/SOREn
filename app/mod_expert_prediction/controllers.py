#Flask dependencies
from flask import Blueprint, request
import pymysql
import operator
import pandas as pd
import simplejson

# Define the blueprint: 'data', set its url prefix: app.url/data
mod_expert_prediction = Blueprint('expert-prediction', __name__, url_prefix='/expert-prediction')

conn = pymysql.connect(host='127.0.0.1', port=8889, user='root', passwd='root', db='SOREn')   

@mod_expert_prediction.route('/')
def index():
	tags = ["java","android"]
	weights = [0.5,0.5]

	cur = conn.cursor()
	user_list = {}
	user_tag_list = {}
	for k in range(len(tags)):
		cur.execute("SELECT User_id, (51 - Rank) FROM top_expert_users where tag = \'"+tags[k]+"\'")	
		r = cur.fetchall()
		for record in r:
			if(user_list.has_key(record[0])):
				user_list[record[0]] = user_list[record[0]] + int(record[1])*weights[k]
				user_tag_list[record[0]] = user_tag_list[record[0]]+"|"+tags[k]
			else:
				user_list[record[0]] = int(record[1])*weights[k];	
				user_tag_list[record[0]] = tags[k]
	sorted_users = sorted(user_list.items(), key=operator.itemgetter(1))
	user_count = min(20, len(sorted_users));

	user_ids = ','.join(user_id[0] for user_id in sorted_users)

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

	cur.close()
	conn.close()
	return simplejson.dumps(return_data);