package com.dicoding.picodiploma.nugaskuy_ap.ui.ai

import android.Manifest
import android.annotation.SuppressLint
import android.app.Activity
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.os.Bundle
import android.provider.MediaStore
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.lifecycle.ViewModelProvider
import com.dicoding.picodiploma.nugaskuy_ap.R
import com.dicoding.picodiploma.nugaskuy_ap.databinding.FragmentAiBinding

class AIFragment : Fragment() {

    companion object {
        private val REQUIRED_PERMISSIONS = arrayOf(
            Manifest.permission.CAMERA,
            Manifest.permission.WRITE_EXTERNAL_STORAGE
        )
        private const val REQUEST_CODE_PERMISSIONS = 10
        private const val REQUEST_IMAGE_CAPTURE = 1
    }

    private lateinit var binding: FragmentAiBinding

    //LAYOUT
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        binding = FragmentAiBinding.inflate(inflater, container, false)
        return binding.root
    }

    //LOGIC
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.btnScanSoal.setOnClickListener { startIntentCamera() }
        //binding.btnGaleri.setOnClickListener { startGallery() }

        if (!allPermissionsGranted()) {
            ActivityCompat.requestPermissions(
                requireActivity(),
                REQUIRED_PERMISSIONS,
                REQUEST_CODE_PERMISSIONS
            )
        }
    }

    @Deprecated("Deprecated in Java")
    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == REQUEST_CODE_PERMISSIONS) {
            if (!allPermissionsGranted()) {
                Toast.makeText(
                    requireContext(),
                    "Tidak mendapatkan permission.",
                    Toast.LENGTH_SHORT
                ).show()
                requireActivity().finish()
            }
        }
    }

    private fun allPermissionsGranted() = REQUIRED_PERMISSIONS.all {
        ContextCompat.checkSelfPermission(requireContext(), it) == PackageManager.PERMISSION_GRANTED
    }

    // BUTTON
    @SuppressLint("QueryPermissionsNeeded")
    private fun startIntentCamera() {
        val takePictureIntent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
        if (takePictureIntent.resolveActivity(requireActivity().packageManager) != null) {
            startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE)
        } else {
            Toast.makeText(requireContext(), "Tidak ada aplikasi kamera", Toast.LENGTH_SHORT).show()
        }
    }

    @SuppressLint("CommitTransaction")
    @Deprecated("Deprecated in Java")
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == REQUEST_IMAGE_CAPTURE && resultCode == Activity.RESULT_OK) {
            val imageBitmap = data?.extras?.get("data") as? Bitmap

            // Hasil capture disimpan sebagai argument Fragment
            val captureViewModel = ViewModelProvider(requireActivity())[CaptureViewModel::class.java]
            captureViewModel.setCapturedImage(imageBitmap)

            val intentResultFragment = IntentResultFragment()

            // Pindah fragment
            requireActivity().supportFragmentManager.beginTransaction()
                .replace(R.id.fragmentAi, IntentResultFragment())
                .addToBackStack(null)
                .commit()
        }
    }
}