import os
import tensorflow as tf

from flask import Flask,request,jsonify
# from controllers.logic import load_and_predict, get_recommended_images,load_model_from_gcs
from controllers.logic import get_recommended_images

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
    num_images = 5
    predict_category, predict_categories = load_and_predict(file,model)

    if predict_category is None:
        return jsonify({'error': 'Invalid image file.'}), 400
    
    recommended_images = get_recommended_images(predict_categories, num_images)

    return jsonify({
        'category_type' : int(predict_category),
        'category_name' : predict_categories,
        'path' : recommended_images
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))  
    app.run(host="0.0.0.0",port=port)