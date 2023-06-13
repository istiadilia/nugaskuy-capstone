# Menggunakan Python versi 3.9 sebagai base image
FROM python:3.9-slim

# Mengatur direktori kerja di dalam container
WORKDIR /app

# Menginstal dependensi yang diperlukan
RUN pip install --no-cache-dir Pillow google-cloud-storage flask tensorflow

# Menyalin seluruh kode proyek ke direktori kerja di dalam container
COPY . .

# Menentukan port yang akan didengarkan oleh aplikasi Flask
EXPOSE 8080

# Menjalankan server aplikasi Flask
CMD [ "python", "app.py" ]