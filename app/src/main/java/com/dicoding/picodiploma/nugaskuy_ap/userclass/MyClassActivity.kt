package com.dicoding.picodiploma.nugaskuy_ap.userclass

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.dicoding.picodiploma.nugaskuy_ap.R
import com.dicoding.picodiploma.nugaskuy_ap.databinding.ActivityMyClassBinding

class MyClassActivity : AppCompatActivity() {

    lateinit var binding: ActivityMyClassBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMyClassBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.classRv.setOnClickListener {
            val intent = Intent(this, DetailClassActivity::class.java)
            startActivity(intent)
        }
    }
}