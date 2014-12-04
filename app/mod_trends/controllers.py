#Flask dependencies
from flask import Blueprint, request, render_template
from random import randint
import json
import MySQLdb
from datetime import datetime, date, timedelta
import time
import os

# Define the blueprint: 'data', set its url prefix: app.url/data
mod_trends = Blueprint('trends', __name__, url_prefix='/trends')

@mod_trends.route('/')
def index():
	return render_template("mod_trends/index.html")

@mod_trends.route('/temp')
def temp():
	return render_template("mod_trends/temp.html")

def connect_db():
    db_conn = MySQLdb.connect(host="localhost",user="root",passwd="",db="soren")
    return db_conn

@mod_trends.route('/trend-data')
def get_trend_graph_data():
	base_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__))) + "/static/data/trends/"
	open_api_list = ["facebook-graph-api","google-maps-api-3","google-api","youtube-api","twitter-api","paypal-api"]
	browser_list = ["internet-explorer","google-chrome","firefox","safari"]
	cms_list = ["maven","svn","github","drupal"]
	ide_list = ["eclipse","visual-studio","matlab","netbeans","emacs","intellij-idea","android-studio","xcode"]
	data_format_list = ["xml","json","csv","pdf","yaml"]
	os_list = ["ios","windows","osx","unix","ubuntu","centos","debian","linux"]
	mobile_list = ["android","objective-c","cocoa","windows-phone","jquery-mobile","phonegap","sencha-touch","xamarin","symbian"]
	server_side_scripting_list = ["php", "python", "asp.net", "ruby-on-rails","django","node.js","jsp","coldfusion"]
	back_end_list = ["mysql","oracle","mongodb","sqlite","postgresql","ms-access","neo4j","cassandra","db2","couchdb"]
	front_end_list = ["html","javascript","css","jquery","angular","coffeescript","extjs","less"]

	overall_list = [
		{ "key":"open_api_list", "values":open_api_list}, 
		{ "key":"browser_list", "values":browser_list}, 
		{ "key":"cms_list", "values":cms_list}, 
		{ "key":"ide_list", "values":ide_list}, 
		{ "key":"data_format_list", "values":data_format_list}, 
		{ "key":"os_list", "values":os_list}, 
		{ "key":"mobile_list", "values":mobile_list}, 
		{ "key":"server_side_scripting_list", "values":server_side_scripting_list}, 
		{ "key":"back_end_list", "values":back_end_list}, 
		{ "key":"front_end_list", "values":front_end_list}
	]

	db = connect_db()
	cursor = db.cursor()

	for technology_list in overall_list:
		response = {}
		least_date = date.today()
		hightest_date = date(1998,01,01)

		for technology in technology_list["values"]:
			query = "SELECT DATE_ADD(count_date, INTERVAL(1-DAYOFWEEK(count_date)) DAY) AS week_date, SUM(count) FROM tag_frequency WHERE tag_name = '%s' GROUP BY week_date ORDER BY week_date" % (technology)
			# print query
			# query = "SELECT count_date, count FROM tag_frequency WHERE tag_name = 'html' AND count_date > '2011-01-01' ORDER BY count_date"
			cursor.execute(query)
			rows = cursor.fetchall()

			if len(rows) == 0:
				continue

			print technology, rows[0], rows[len(rows)-1]

			if least_date > rows[0][0]:
				least_date = rows[0][0]

			if hightest_date < rows[len(rows)-1][0]:
				hightest_date = rows[len(rows)-1][0]

			technology_item_dict = {}
			for row in rows:
				technology_item_dict[int(time.mktime(row[0].timetuple()) * 1000)] = int(row[1])
			response[technology] = technology_item_dict

		json_response = []
		for technology in technology_list["values"]:
			current_date = least_date

			technology_values_list = []
			prev_value = 0
			while current_date <= hightest_date:
				key = int(time.mktime(current_date.timetuple()) * 1000)
				if technology in response:
					if key in response[technology]:
						prev_value = response[technology][key]
						technology_values_list.append([key, response[technology][key]])
					else:
						technology_values_list.append([key, prev_value])
				current_date += timedelta(days=7)
			json_response.append({"key":technology, "values": technology_values_list})

		with open(base_path+technology_list["key"]+".json", 'w') as outfile:
  			json.dump(json_response, outfile)
	return "Files written to " + base_path

@mod_trends.route('/get-data2')
def get_data2():
	list_row = ["PHP", "Python", "ASP .NET", "Ruby On Rails", "Django", "Node.js", "JSP", "ColdFusion"]
	list_col = ["MySQL","SQL Server","Oracle","MongoDB","SQLite","PostGreSQL","MS Access","Neo4j","Cassandra","DB2","CouchDB"]

	connection_strengths = []
	for x in range(0, len(list_row)):
		temp_list = []
		for y in range(0, len(list_col)):
			temp_list.append(randint(1,15))
		connection_strengths.append(temp_list)

	return json.dumps({'row': list_row, 'col': list_col, 'values': connection_strengths})
