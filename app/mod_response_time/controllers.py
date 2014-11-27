#Flask dependencies
from flask import Blueprint, request, render_template

# Define the blueprint: 'data', set its url prefix: app.url/data
mod_response_time = Blueprint('response-time', __name__, url_prefix='/questions')

@mod_response_time.route('/ask')
def index():
	return render_template("mod_response_time/index.html")