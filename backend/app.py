from flask import Flask, request, jsonify, render_template
from model import process_user_input

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/process_input', methods=['POST'])
def process_input():
   
    user_input = request.json['user_input']
    response, should_exit = process_user_input(user_input)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)