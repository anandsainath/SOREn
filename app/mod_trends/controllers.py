#Flask dependencies
from flask import Blueprint, request

# Define the blueprint: 'data', set its url prefix: app.url/data
mod_trends = Blueprint('trends', __name__, url_prefix='/trends')

@mod_trends.route('/')
def index():
	return "Hello World!"