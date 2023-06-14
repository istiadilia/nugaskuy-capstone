import os
import requests

from flask import Flask,request,jsonify
from controllers.logic import load_and_predict, get_recommended_images

app = Flask(__name__)
endpoint_prefix = os.environ.get('ENDPOINT_PREFIX', '/')

@app.route(endpoint_prefix + '/', methods=['GET'])
def default():
    return jsonify({'message': 'Welcome to the API'}),201

@app.route('/predict', methods=['POST'])
def predict():
    global model
    if 'file' not in request.files:
        return jsonify({'error': 'No file in the request.'}), 400

    file = request.files['file']
    num_images = 8
    predict_category, predict_categories = load_and_predict(file)

    if predict_category is None:
        return jsonify({'error': 'Invalid image file.'}), 400
    
    recommended_images = get_recommended_images(predict_categories, num_images)

    return jsonify({
        'category_type' : int(predict_category),
        'category_name' : predict_categories,
        'path' : recommended_images
    })

def download_model_from_url(destination_path):
    response = requests.get('https://storage.googleapis.com/nugaskuy/model.h5')
    with open(destination_path, 'wb') as file:
        file.write(response.content)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))  
    download_model_from_url('model.h5')
    app.run(host="0.0.0.0",port=port)