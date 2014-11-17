#Flask dependencies
from flask import Blueprint, request, render_template

# Define the blueprint: 'data', set its url prefix: app.url/data
mod_trends = Blueprint('trends', __name__, url_prefix='/trends')

@mod_trends.route('/')
def index():
	return render_template("mod_trends/index.html")