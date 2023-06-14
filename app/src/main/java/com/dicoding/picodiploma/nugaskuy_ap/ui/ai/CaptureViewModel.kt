package com.dicoding.picodiploma.nugaskuy_ap.ui.ai

import android.graphics.Bitmap
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class CaptureViewModel : ViewModel() {
    private val _capturedImage = MutableLiveData<Bitmap?>()
    val capturedImage: LiveData<Bitmap?> = _capturedImage

    fun setCapturedImage(bitmap: Bitmap?) {
        _capturedImage.value = bitmap
    }

}