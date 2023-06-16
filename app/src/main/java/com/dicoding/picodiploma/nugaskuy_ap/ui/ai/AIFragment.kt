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

        binding = FragmentAiBinding.bind(view)
        binding.btnToCapture.setOnClickListener {
            val intent = Intent(requireContext(), CaptureActivity::class.java)
            startActivity(intent)
        }
    }
}