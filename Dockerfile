# Menggunakan Node.js versi 14 sebagai base image
FROM node:14

# Mengatur direktori kerja di dalam container
WORKDIR /app

# Menyalin package.json dan package-lock.json untuk menginstal dependensi
COPY package*.json ./

# Menginstal dependensi yang diperlukan
RUN npm install

# Menyalin seluruh kode proyek ke direktori kerja di dalam container
COPY . .

# Menjalankan server aplikasi
CMD [ "node", "index.js" ]