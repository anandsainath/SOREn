#Flask dependencies
from flask import Blueprint, request, render_template
import json
from sklearn.externals import joblib
from sklearn import tree,cross_validation,svm,metrics
import numpy as np
import os
import re
import datetime

# Define the blueprint: 'data', set its url prefix: app.url/data
mod_response_time = Blueprint('response-time', __name__, url_prefix='/questions')
base_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__))) + "/static/data/"

@mod_response_time.route('/')
def index():
	# return render_template("mod_response_time/index.html")
	return render_template("mod_response_time/temp.html")

@mod_response_time.route('/ask')
def ask():
	return render_template("mod_response_time/ask.html")

def parseBody(x):
	y = re.findall("(<[^>\n]*>)",x.strip())
	code_blocks = re.findall("<code>.*</code>",x.strip())
	tag_len = ''.join(tag for tag in y)
	code = ''.join(code_block for code_block in code_blocks)
	Qn_len = len(x) - len(code)
	code_len = len(code) - (len(code_blocks)*5)
	verb_list = ["tried", "did", "made", "used", "run"]
	self_ref_list = ["I", "we","me", "my", "myself"]
	verb_count = 0
	for verb in verb_list:
		verb_count = verb_count + x.count(verb);
	self_ref_count = 0
	for self_ref in self_ref_list:
		self_ref_count = self_ref_count + x.count(self_ref);
	return [x.count("<code>"),x.count("<img src"), Qn_len ,x.count("<a href="), code_len, verb_count, self_ref_count]

@mod_response_time.route('/get-predictions', methods=['GET','POST'])
def get_predictions():
	result = {}
	clf1 = joblib.load(base_path+'models/fastest/model.pkl')
	body = request.form
	tags_list = request.form['tags']
	features = parseBody(request.form['body'])
        tags = tags_list.split(',')
	popular_tags = ['javascript','java','php','android','jquery','html','python','ios','css','mysql','sql','objective-c','ruby-on-rails','angularjs','c','arrays','json','sql-server','ajax','ruby']

	features.append(len(tags))
	p_tags = 0
        for tag in tags:
		if tag in popular_tags:
        		p_tags += 1

	features.append(p_tags)
	if datetime.date.today().weekday() in [5,6]:
		isweekday = 1
	else:
		isweekday = 0
	features.append(isweekday)
	print features
	fastest_class = clf1.predict(features)
	clf2 = joblib.load(base_path+'models/authoritative/model2.pkl')
	auth_class = clf2.predict(features)
	result['fastest'] = int(fastest_class[0])
	result['authoritative'] = int(auth_class[0])
	
	return json.dumps(result)
