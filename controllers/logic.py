import random
import os
import numpy as np
import tensorflow as tf

from google.cloud import storage
from PIL import Image

bucket_name = 'nugaskuy' 
dataset_dir = 'dataset'


def load_and_run_tflite_model(input_data):
    # Load the TFLite model
    interpreter = tf.lite.Interpreter(model_path='https://storage.googleapis.com/nugaskuy/modelv2.tflite')
    interpreter.allocate_tensors()

    # Get input and output details
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()

    # Set input data
    interpreter.set_tensor(input_details[0]['index'], input_data)

    # Run the interpreter
    interpreter.invoke()

    # Get the output results
    output_data = interpreter.get_tensor(output_details[0]['index'])

    return output_data

def get_recommended_images(category, num_images):
    # Membuat objek storage client
    storage_client = storage.Client()

    # Mendapatkan objek bucket
    bucket = storage_client.get_bucket(bucket_name)

    # Mendapatkan daftar file dalam direktori kategori di bucket
    category_dir = os.path.join(dataset_dir, category)
    blobs = bucket.list_blobs(prefix=category_dir + '/')

    # Mengambil nama file dari daftar blobs
    image_files = [blob.name for blob in blobs]

    # Jika ada lebih sedikit gambar daripada yang diminta
    num_images = min(num_images, len(image_files))

    # Memilih gambar secara acak
    recommended_images = random.sample(image_files, num_images)

    # Mengembalikan daftar URL publik untuk gambar yang direkomendasikan
    return [f"https://storage.googleapis.com/{bucket_name}/{image_file}" for image_file in recommended_images]
    # return recommended_images

def load_and_predict(image):
    img_size = 224
#     model = tf.keras.models.load_model('gs://nugaskuy/model.h5')

    try:
        # Setup Image untuk kebutuhan prediksi
        img = Image.open(image)
        img = img.convert("RGB")
        img = img.resize((img_size, img_size))
        img_array = np.array(img) / 255.0
        img_array = img_array[np.newaxis, ...]
        img_array = img_array.astype(np.float32)

        # Melakukan prediksi
        prediction = load_and_run_tflite_model(img_array)
#         prediction = model.predict(img_array)
        predicted_class = np.argmax(prediction)

        categories = ["logaritma", "spldv", "integral", "pertidaksamaan", "eksponen"]
        # Ubah class menjadi categorie
        predict_categories = categories[predicted_class]

        return predicted_class, predict_categories

    except OSError:
        return None, None
