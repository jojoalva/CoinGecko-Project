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
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/data"
    )



if __name__ == '__main__':
    app.run(debug=True)