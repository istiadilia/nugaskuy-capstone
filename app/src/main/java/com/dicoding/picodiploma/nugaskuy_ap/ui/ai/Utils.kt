package com.dicoding.picodiploma.nugaskuy_ap.ui.ai

import android.app.Application
import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Matrix
import android.os.Environment
import java.io.File
import java.io.FileOutputStream
import java.io.IOException
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

private const val DIRECTORY_NAME = "KameraApp"
private const val IMAGE_FORMAT = ".jpg"

fun createImageFile(context: Context): File? {
    val timeStamp = SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault()).format(Date())
    val fileName = "IMG_$timeStamp"
    val storageDir = getExternalStorageDirectory(context)

    return try {
        val imageFile = File.createTempFile(fileName, IMAGE_FORMAT, storageDir)
        imageFile
    } catch (ex: IOException) {
        ex.printStackTrace()
        null
    }
}

fun saveBitmapToFile(bitmap: Bitmap, file: File?): Boolean {
    if (file == null) return false

    return try {
        val outputStream = FileOutputStream(file)
        bitmap.compress(Bitmap.CompressFormat.JPEG, 100, outputStream)
        outputStream.flush()
        outputStream.close()
        true
    } catch (ex: IOException) {
        ex.printStackTrace()
        false
    }
}

private fun getExternalStorageDirectory(context: Context): File {
    val storageDir = context.getExternalFilesDir(Environment.DIRECTORY_PICTURES)
    if (storageDir != null && storageDir.exists())
        return storageDir
    else
        return context.filesDir
}