# -*- coding: utf-8 -*-
"""
Created on Sat May 30 19:42:09 2020

@author: Ritvik Verma
"""


from flask import Flask, jsonify
from flask_restplus import Resource, Api
from datetime import datetime
#import psycopg2


class TheGoods(Resource):
    def get(self, magtype, start, end):
        min = datetime.strptime(start, '%Y-%m-%d %H:%M:%S.%f')
        max = datetime.strptime(end, '%Y-%m-%d %H:%M:%S.%f')
        

        #conn = psycopg2.connect(host="172.18.0.4",database="photon", user="forensx", password="forensx")       
       
       
       
       
        resp = jsonify({'Magtype': magtype,'Start': start,'End': end}) 
        #respopnse is serialized JSON
        #needs to be data from sql
       
        return resp
