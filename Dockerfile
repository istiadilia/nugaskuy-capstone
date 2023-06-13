# Menggunakan Python versi 3.9 sebagai base image
FROM python:3.9

# Mengatur direktori kerja di dalam container
WORKDIR /app

# Menyalin requirements.txt untuk menginstal dependensi
COPY requirements.txt .

# Menginstal dependensi yang diperlukan
RUN pip install --no-cache-dir -r requirements.txt

# Menyalin seluruh kode proyek ke direktori kerja di dalam container
COPY . .

# Menjalankan server aplikasi Flask
CMD [ "python", "app.py" ]