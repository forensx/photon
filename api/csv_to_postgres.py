# -*- coding: utf-8 -*-
"""
Created on Sat May 30 18:51:38 2020

@author: Ritvik Verma
"""

import pandas as pd
from sqlalchemy import create_engine
import psycopg2
from io import StringIO
def sendToPG(df, tableName, con):
    output = StringIO()
    df.to_csv(output, sep='\t', header=False, index=False)
    output.getvalue()
    output.seek(0)
    raw = con.raw_connection()
    curs = raw.cursor()
    # null values become ''
    columns = df.columns
    curs.copy_from(output, tableName, null="", columns=(columns))
    curs.connection.commit()
    curs.close()

engine = create_engine('postgresql+psycopg2://forensx:forensx@localhost/photon')
#conn = engine.raw_connection()

#conn = psycopg2.connect(host="localhost", port = 5432, database="photon", user="forensx", password="forensx")
df = pd.read_csv("NO2_Combined.csv",index_col = "id").reset_index()
df[:0].to_sql("no" + str(2)+"_data", engine, if_exists="append", index=False, schema="public")

sendToPG(df,"no" + str(2)+"_data", engine)
#df.to_sql('NO2_Data', con=engine, schema='public', if_exists = "append", index = False)