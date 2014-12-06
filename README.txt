SOREn
----------------------------------------------
This package provides the Stack Overflow Recommender Engine software.  The system provides information such as the users who might most likely have a solution for a question on Stack Overflow and a probabilistic estimate of the turnaround times. It also provides temporal trends to users in topics (tags) related to the question so that they can have a good idea of how active the topic is in StackOverflow’s developer community.

This is a class project for the course CS6242 - Data and Visual Analytics in Fall 2014. 

CONTACT : 
For questions about the application, please contact CDC(Chennai Data club) at
1. asainath@gatech.edu
2. sanjay.obla@gatech.edu
3. arajagopal@gatech.edu

QUICKSTART INSTRUCTIONS :

The prerequisites to run this application are
1. Python 2.8 or above
2. MySQL 
3. FLASK API

The system has been tested on MAC, Ubuntu and Windows

CODE : 
The size of this software is greater than 5MB. Please clone the code repository from https://github.com/anandsainath/SOREn. 

EXECUTION STEPS:
Start MYSQL service
Restore the MySQL dump -soren.dump from SOREn folder

Execute the run.py file in SOREn folder
python run.py runserver

URL for the appliction : 

Expert prediction/response time : 0.0.0.0:5000/questions/
Trends : 0.0.0.0:5000/trends/
