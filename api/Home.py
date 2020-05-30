from flask import Flask, jsonify
from flask_restplus import Resource, Api

class Home(Resource):
    def get(self):
        resp = jsonify({'Hello world': "Hello world"}) #respopnse is serialized JSON
        return resp