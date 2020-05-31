from flask import Flask, jsonify
from flask_restplus import Resource, Api

app = Flask(__name__)
api = Api(app)

#import resources
from thegoods import TheGoods

#add resources

api.add_resource(TheGoods, '/goods/<string:magtype>/<string:start>/<string:end>')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, debug=True, threaded=True)
