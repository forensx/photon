from flask import Flask, jsonify
from flask_restplus import Resource, Api

app = Flask(__name__)
api = Api(app)


@api.route('/home')
class Home(Resource):
    def get(self):
        # return serialized JSON
        return jsonify({'Hello world': "Hello world"})


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, debug=True, threaded=True)
