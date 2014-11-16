#Flask dependencies
from flask import Blueprint, request

# Define the blueprint: 'data', set its url prefix: app.url/data
mod_expert_prediction = Blueprint('expert-prediction', __name__, url_prefix='/expert-prediction')

@mod_expert_prediction.route('/')
def index():
	return "Hello World!"