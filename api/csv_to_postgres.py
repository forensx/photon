# -*- coding: utf-8 -*-
"""
Created on Sat May 30 18:51:38 2020

@author: Ritvik Verma
"""

import pandas as pd
from sqlalchemy import create_engine


engine = create_engine('postgresql+psycopg2://forensx:forensx@172.18.0.4/photon')



df = pd.read_json("csvjson.json")
df.to_sql('test', con=engine, if_exists = "append", index = False)

