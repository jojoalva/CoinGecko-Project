from types import prepare_class
import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, MetaData, Table
from flask import Flask, render_template, jsonify
import json

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///coins.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)

# Save reference to the table
Coins = Base.classes.coindata

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

@app.route("/")
def welcome():
    """List all available API routes."""
    return (
        "Available Routes:<br/>"
        '<a href="/api/metadata">/api/metadata</a><br/>'
        '<a href="/metadata">/html/metadata</a><br/>'
        '<a href="/other_route">/other_route</a><br/>'
    )

#################################################
# API Routes
################################################# 

@app.route("/api/metadata")
def extract():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query data we want
    results = session.query(Coins.name, Coins.current_price, Coins.market_cap, Coins.total_volume, 
                            Coins.high_24h, Coins.low_24h).all()

    session.close()

     # Create a dictionary from the row data and append to a list of all_data
    all_data = []
    for name, current_price, market_cap, total_volume, high_24h, low_24h in results:
        data_dict = {}
        data_dict["name"] = name
        data_dict["current_price"] = current_price
        data_dict["market_cap"] = market_cap
        data_dict["total_volume"] = total_volume
        data_dict["high_24h"] = high_24h
        data_dict["low_24h"] = low_24h
        all_data.append(data_dict)

    # Save the JSON File
    file2 = open('static/data/all_dataJSON.json', 'w')
    file2.write(json.dumps(all_data))
    file2.close

    return jsonify(all_data)

#################################################
# HTML Routes
################################################# 

@app.route("/metadata")
def metadata():

    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)