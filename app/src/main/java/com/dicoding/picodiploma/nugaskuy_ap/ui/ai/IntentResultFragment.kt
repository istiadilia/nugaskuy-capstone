package com.dicoding.picodiploma.nugaskuy_ap.ui.ai

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.dicoding.picodiploma.nugaskuy_ap.databinding.FragmentAiIntentResultBinding

class IntentResultFragment : Fragment() {
    private lateinit var binding: FragmentAiIntentResultBinding
    private lateinit var captureViewModel: CaptureViewModel
    private lateinit var imageView: ImageView

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        binding = FragmentAiIntentResultBinding.inflate(inflater, container, false)

        imageView = binding.hasilIntent
        captureViewModel = ViewModelProvider(requireActivity())[CaptureViewModel::class.java]

        captureViewModel.capturedImage.observe(viewLifecycleOwner) { imageBitmap ->
            if (imageBitmap != null) {
                imageView.setImageBitmap(imageBitmap)
                //cropImage(imageBitmap)
            }
        }
        return binding.root
    }

    //private fun cropImage(imageBitmap: Bitmap) {
    //    CropImage.activity(imageBitmap)
    //        .setGuidel
    //}

}