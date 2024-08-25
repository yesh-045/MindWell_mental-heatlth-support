from flask import Flask, request, jsonify
from flask_cors import CORS
from model import process_user_input

app = Flask(__name__)
CORS(app) 

@app.route('/process_input', methods=['POST'])
def process_input():
    user_input = request.json['user_input']
    response, should_exit = process_user_input(user_input)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)