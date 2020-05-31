# -*- coding: utf-8 -*-
"""
Created on Sat May 30 19:42:09 2020

@author: Ritvik Verma
"""


from flask import Flask, jsonify
from flask_restplus import Resource, Api
from datetime import datetime
import psycopg2
import json
import sys


class TheGoods(Resource):
    def get(self, magtype, start, end):
        min = datetime.strptime(start, '%Y-%m-%d %H:%M:%S.%f')
        max = datetime.strptime(end, '%Y-%m-%d %H:%M:%S.%f')
        
        conn = None
        
        try:            
            conn = psycopg2.connect(host="172.18.0.2", port = 5432, database="photon", user="forensx", password="forensx")
       
            cur = conn.cursor()
            cur.execute("SELECT * FROM test WHERE test.\"Source\"=%s", (magtype,))
        
            temp = cur.fetchall()
            dictX = {}
            
            for record in temp:
                if record[0]>= min:
                    if record[0]<= max:
                        dictX = jsonify[record].json()
        
        
            return dictX
          #  resp = jsonify(cur.fetchall()) #respopnse is serialized JSON
          #  return resp
                
        #except psycopg2.DatabaseError as e:
            #print(f'Error {e}')
            #sys.exit(1)
        
        
        finally:
            
            if conn:
                cur.close()
                conn.close()
       
       
        #respopnse is serialized JSON
        #needs to be data from sql


#datetime.strptime(test.\"DateTime\", '%Y-%m-%d %H:%M:%S.%f')
        
       # datetime.strptime(record[1], '%Y-%m-%d %H:%M:%S.%f')
        
        #if datetime.strptime(record[0], '%Y-%m-%d %H:%M:%S.%f')>= min:
                 #   if datetime.strptime(record[0], '%Y-%m-%d %H:%M:%S.%f')<= max: