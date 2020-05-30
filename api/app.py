from flask import Flask, jsonify
from flask_restplus import Resource, Api

app = Flask(__name__)
api = Api(app)

#import resources
from Home import Home

#add resources
api.add_resource(Home, '/home')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, debug=True, threaded=True)
