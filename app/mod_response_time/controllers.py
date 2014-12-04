#Flask dependencies
from flask import Blueprint, request, render_template
import json

# Define the blueprint: 'data', set its url prefix: app.url/data
mod_response_time = Blueprint('response-time', __name__, url_prefix='/questions')

@mod_response_time.route('/')
def index():
	return render_template("mod_response_time/index.html")

@mod_response_time.route('/ask')
def ask():
	return render_template("mod_response_time/ask.html")

@mod_response_time.route('/get-predictions', methods=['GET','POST'])
def get_predictions():
	result = {}
	result['fastest'] = 0
	result['authoritative'] = 1

	return json.dumps(result)
