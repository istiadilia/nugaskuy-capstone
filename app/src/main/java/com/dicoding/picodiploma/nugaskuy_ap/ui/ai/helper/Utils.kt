package com.dicoding.picodiploma.nugaskuy_ap.ui.ai.helper

import android.content.Context
import android.net.Uri
import android.os.Environment
import java.io.File
import java.io.FileOutputStream
import java.io.InputStream
import java.io.OutputStream
import java.text.SimpleDateFormat
import java.util.Locale

private const val FILENAME_FORMAT = "dd-MMM-yyyy"

val timeStamp: String = SimpleDateFormat(
    FILENAME_FORMAT,
    Locale.US
).format(System.currentTimeMillis())

fun createTempFile(context: Context): File {
    val storageDirectory = context.getExternalFilesDir(Environment.DIRECTORY_PICTURES)
    return File.createTempFile(timeStamp, ".jpg", storageDirectory)
}

fun uriToFile(uri: Uri, context: Context): File {
    val contentResolver = context.contentResolver
    val file = createTempFile(context)

    val inputStream: InputStream = contentResolver.openInputStream(uri) as InputStream
    val outputStream: OutputStream = FileOutputStream(file)

    val bufferSize = ByteArray(1024)
    var temp: Int
    while (inputStream.read(bufferSize).also { temp = it } > 0) {
        outputStream.write(bufferSize, 0, temp)
    }
    inputStream.close()
    outputStream.close()

    return file
}
