SOREn
----------------------------------------------
This package provides the Stack Overflow Recommender Engine software.  The system provides information such as the users who might most likely have a solution for a question on Stack Overflow and a probabilistic estimate of the turnaround times. It also provides temporal trends to users in topics (tags) related to the question so that they can have a good idea of how active the topic is in StackOverflow’s developer community.

This is a class project for the course CS6242 - Data and Visual Analytics in Fall 2014. 

CONTACT : 
For questions about the application, please contact CDC(Chennai Data club) at
1. arajagopal@gatech.edu
2. anand.sainath@gatech.edu / anand.sainath@gmail.com
3. sanjay.obla@gatech.edu

QUICKSTART INSTRUCTIONS :

The prerequisites to run this application are
1. Python 2.8 or above
2. MySQL 
3. Flask API

The system has been tested on MAC and Ubuntu

CODE : 
	The size of this software is greater than 5MB. Please clone the code repository from https://github.com/anandsainath/SOREn. 
	Please download the database backup dump from - https://drive.google.com/file/d/0BxF30ePLJYwGSnNoNUNDYXo2SjQ/view?usp=sharing

EXECUTION STEPS:

1. Restoring the Database.

	[We suggest using a GUI client for MySQL. The one that we have used for our application is MySQL WorkBench]

	Start MySQL service

	Create a database called "soren". (Use the command "create database soren" via commandline)
	
	By default, our mysql instance is configured with username as "root" and password as "". Incase the MySQL environment that the backup is being restored does not have the following credentials, the corresponding changes need to be made in app/mod_trends/controllers.py - line 47 and app/mod_expert_prediction/controllers.py - line 13.

	Extract the complete_backup.sql.zip file to reveal the sql file.

	Use the MySQLWorkBench GUI to import the dump file inside the database called "soren".

2. Installing dependencies

	The following dependencies need to be installed for sure.

	pip install flask
	pip install flask-script
	pip install flask-mongoengine
	pip install blueprint

	PS: There could be one or two packages like the ones stated above that we could have missed listing as they might have been already installed on our machines. If that is the case, running the flask application would give you an error stating that the particular package is not found. A simple pip install <<package_name>> would suffice.

3. Execute the run.py file in SOREn folder
	
	python run.py server -p 5000

--------------------------------

URL for the appliction : 

	1. Expert prediction + response time : 0.0.0.0:5000/questions/

	Inoder to see the expert prediction and response time working, you need to provide a sample question as one would ask in StackOverflow. Below is an example that you could use. [Please copy the contents of TITLE, CONTENT and TAGS and paste them in the corresponding text boxes]

		TITLE: Moving from one activity to another in Android

		CONTENT:
		I am an Android noob and I don't seem to get how to move from one activity to another. I have declared the layouts using XML and have added the activity's name to the Android manifest file. But I'm getting a Null Pointer exception. Below is an excerpt of the code that is causing the exception.

		`Activity activity = new Activity()
		startActivityForAction(activity)`

		I have tried a couple of links on StackOverflow but they haven't helped me solve the problem


		TAGS: Java, Android, XML

	PS: Our approach definitely needs Tags to be specified as a part of the question.


	2. Trends : 0.0.0.0:5000/trends/



