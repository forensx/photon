# -*- coding: utf-8 -*-
"""
Created on Sat May 30 23:12:30 2020

@author: Ritvik Verma
"""

# This gist contains a direct connection to a local PostgreSQL database
# called "suppliers" where the username and password parameters are "postgres"

# This code is adapted from the tutorial hosted below:
# http://www.postgresqltutorial.com/postgresql-python/connect/

import psycopg2

# Establish a connection to the database by creating a cursor object
# The PostgreSQL server must be accessed through the PostgreSQL APP or Terminal Shell

# conn = psycopg2.connect("dbname=suppliers port=5432 user=postgres password=postgres")

# Or:
conn = psycopg2.connect(host="172.18.0.4", port = 5432, database="photon", user="forensx", password="forensx")

# Create a cursor object
cur = conn.cursor()

# A sample query of all data from the "vendors" table in the "suppliers" database
cur.execute("SELECT * FROM test;")

print(cur.rowcount)

# Close the cursor and connection to so the server can allocate
# bandwidth to other requests
cur.close()
conn.close()