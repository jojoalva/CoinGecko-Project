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
        '<a href="/dashboard">/html/dashboard</a><br/>'
    )

#################################################
# API Routes
################################################# 

@app.route("/api/metadata")
def extract():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query data we want
    results = session.query(Coins).all()

    session.close()

     # Create a dictionary from the row data and append to a list of all_data
    all_data = []
    for result in results:
        all_data.append({
            "id": result.id,
            "name": result.name,
            "symbol": result.symbol,
            "current_price": result.current_price,
            "market_cap": result.market_cap,
            "market_cap_rank": result.market_cap_rank,
            "fully_diluted_valuation": result.fully_diluted_valuation,
            "total_volume": result.total_volume,
            "high_24h": result.high_24h,
            "low_24h": result.low_24h,
            "price_change_24h": result.price_change_24h,
            "price_change_percentage_24h": result.price_change_percentage_24h,
            "market_cap_change_24h": result.market_cap_change_24h,
            "market_cap_change_percentage_24h": result.market_cap_change_percentage_24h,
            "circulating_supply": result.circulating_supply,
            "total_supply": result.total_supply,
            "max_supply": result.max_supply,
            "ath": result.ath,
            "ath_change_percentage": result.ath_change_percentage,
            "ath_date": result.ath_date,
            "atl": result.atl,
            "atl_change_percentage": result.atl_change_percentage,
            "atl_date": result.atl_date,
            "last_updated": result.last_updated
        })

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

@app.route("/dashboard")
def Dashboard():
    session = Session(engine)

    # Query the Coins table and retrieve some data
    results = session.query(Coins).all()

    session.close()

    # Convert the query results to a list of dictionaries
    Crypto_data = []
    for result in results:
        Crypto_data.append({
            "id": result.id,
            "name": result.name,
            "symbol": result.symbol,
            "current_price": result.current_price,
            "market_cap": result.market_cap,
            "market_cap_rank": result.market_cap_rank,
            "fully_diluted_valuation": result.fully_diluted_valuation,
            "total_volume": result.total_volume,
            "high_24h": result.high_24h,
            "low_24h": result.low_24h,
            "price_change_24h": result.price_change_24h,
            "price_change_percentage_24h": result.price_change_percentage_24h,
            "market_cap_change_24h": result.market_cap_change_24h,
            "market_cap_change_percentage_24h": result.market_cap_change_percentage_24h,
            "circulating_supply": result.circulating_supply,
            "total_supply": result.total_supply,
            "max_supply": result.max_supply,
            "ath": result.ath,
            "ath_change_percentage": result.ath_change_percentage,
            "ath_date": result.ath_date,
            "atl": result.atl,
            "atl_change_percentage": result.atl_change_percentage,
            "atl_date": result.atl_date,
            "last_updated": result.last_updated
        })

    # Sort Crypto_data based on market_cap in descending order
    sorted_data = sorted(Crypto_data, key=lambda x: x['market_cap'], reverse=True)

    # Extract top 10 cryptocurrencies based on market dominance
    top_10_currencies = sorted_data[:10]

    print(top_10_currencies)

    return render_template('dashboard.html', top_10_currencies=top_10_currencies) 

if __name__ == '__main__':
    app.run(debug=True)