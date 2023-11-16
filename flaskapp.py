from types import prepare_class
import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, render_template
import json
 


from flask import Flask, jsonify

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///coins.sqlite")
conn = engine.connect()

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables

Base.prepare(autoload_with=engine)

# Create an engine to connect to your database
engine = create_engine('sqlite:///coins.sqlite')  # Replace with your database URL

# Create a MetaData object
metadata = MetaData()

# Reflect the database tables
metadata.reflect(bind=engine)

# Get a list of table names
table_names = engine.table_names()

# Print the table names
print("Tables in the database:")
for table_name in table_names:
    print(table_name)

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/extract"
    )