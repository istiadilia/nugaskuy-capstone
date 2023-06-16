package com.dicoding.picodiploma.nugaskuy_ap.ui.ai

import android.Manifest
import android.annotation.SuppressLint
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.BitmapFactory
import android.os.Bundle
import android.provider.MediaStore
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.core.content.FileProvider
import com.dicoding.picodiploma.nugaskuy_ap.databinding.ActivityCaptureBinding
import com.dicoding.picodiploma.nugaskuy_ap.ui.ai.helper.createTempFile
import java.io.File

class CaptureActivity : AppCompatActivity(){
    companion object {
        private val REQUIRED_PERMISSIONS = arrayOf(
            Manifest.permission.CAMERA,
            Manifest.permission.WRITE_EXTERNAL_STORAGE
        )
        private const val REQUEST_CODE_PERMISSIONS = 10
        private const val REQUEST_IMAGE_CAPTURE = 1
    }

    private lateinit var binding: ActivityCaptureBinding
    private lateinit var viewModel: CaptureViewModel
    private lateinit var getFile: File
    private var fileIsReady = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityCaptureBinding.inflate(layoutInflater)
        setContentView(binding.root)

        supportActionBar?.hide()

        viewModel = CaptureViewModel()

        binding.btnCaptureImage.setOnClickListener { captureImage() }
        //binding.btnCaptureUpload.setOnClickListener { uploadImage() }

        if (!allPermissionsGranted()) {
            ActivityCompat.requestPermissions(
                this,
                REQUIRED_PERMISSIONS,
                REQUEST_CODE_PERMISSIONS
            )
        }
    }

    // LAUNCHER INTENT CAMERA
    private lateinit var currentPhotoPath: String
    private val launcherIntentCamera = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) {
        if (it.resultCode == RESULT_OK) {
            val myFile = File(currentPhotoPath)

            myFile.let { file ->
                getFile = file
                fileIsReady = 1
                binding.capturePreview.setImageBitmap(BitmapFactory.decodeFile(file.path))
            }
        }
    }

    // FUNCTION CAPTURE
    @SuppressLint("QueryPermissionsNeeded")
    private fun captureImage() {
        val intent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
        intent.resolveActivity(packageManager)

        createTempFile(application).also {
            val imageURI = FileProvider.getUriForFile(
                this@CaptureActivity,
                "com.dicoding.picodiploma.nugaskuy_ap",
                it
            )
            currentPhotoPath = it.absolutePath
            intent.putExtra(MediaStore.EXTRA_OUTPUT, imageURI)
            File(currentPhotoPath).deleteOnExit()
            //startActivityForResult(intent, REQUEST_IMAGE_CAPTURE)
            launcherIntentCamera.launch(intent)
        }
    }

    /*
    private fun uploadImage() {
        // Kebutuhan data
        if (fileIsReady == 1) {
            val file = getFile
            val requestImageFile = file.asRequestBody("image/jpeg".toMediaType())
            val imageMultipart: MultipartBody.Part = MultipartBody.Part.createFormData(
                "file",
                file.name,
                requestImageFile
            )

            val apiService = ApiConfig().getApiService()
            viewModel.uploadCapture(imageMultipart).observe(this) {

            }
        } else {
            Toast.makeText(this, getString(R.string.capture_needed), Toast.LENGTH_SHORT).show()
        }
    }
     */

    private fun allPermissionsGranted() = REQUIRED_PERMISSIONS.all {
        ContextCompat.checkSelfPermission(this, it) == PackageManager.PERMISSION_GRANTED
    }

}