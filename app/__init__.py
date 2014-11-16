# Import flask and template operators
from flask import Flask, render_template
from flask.ext.mongoengine import MongoEngine

# Define the WSGI application object
app = Flask(__name__)
app.config["MONGODB_SETTINGS"] = {'DB': "socomp"}
app.config["SECRET_KEY"] = "KeepThisS3cr3t@sK3Y"

db = MongoEngine(app)

# Sample HTTP error handling
@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404

@app.route('/')
def index():
	return render_template('base.html')

from app.mod_trends.controllers import mod_trends as mod_trends
from app.mod_expert_prediction.controllers import mod_expert_prediction as mod_expert_prediction
from app.mod_response_time.controllers import mod_response_time as mod_response_time

# Register blueprint(s)
app.register_blueprint(mod_trends)
app.register_blueprint(mod_response_time)
app.register_blueprint(mod_expert_prediction)