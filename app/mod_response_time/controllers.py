#Flask dependencies
from flask import Blueprint, request

# Define the blueprint: 'data', set its url prefix: app.url/data
mod_response_time = Blueprint('response-time', __name__, url_prefix='/response-time')

@mod_response_time.route('/')
def index():
	return "Hello World!"