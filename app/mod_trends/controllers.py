#Flask dependencies
from flask import Blueprint, request, render_template
from random import randint
import json

# Define the blueprint: 'data', set its url prefix: app.url/data
mod_trends = Blueprint('trends', __name__, url_prefix='/trends')

@mod_trends.route('/')
def index():
	return render_template("mod_trends/index.html")

@mod_trends.route('/temp')
def temp():
	return render_template("mod_trends/temp.html")

@mod_trends.route('/get-data')
def get_data():
	list_row = ["HTML", "JavaScript","CSS","jQuery","AngularJS","CoffeeScript","ExtJS","LESS","Underscore.js","Mootools"]
	list_col = ["MySQL","SQL Server","Oracle","MongoDB","SQLite","PostGreSQL","MS Access","Neo4j","Cassandra","DB2","CouchDB"]

	connection_strengths = []
	for x in range(0, len(list_row)):
		temp_list = []
		for y in range(0, len(list_col)):
			temp_list.append(randint(1,15))
		connection_strengths.append(temp_list)

	return json.dumps({'row': list_row, 'col': list_col, 'values': connection_strengths})

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
