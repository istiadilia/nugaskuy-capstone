package com.dicoding.picodiploma.nugaskuy_ap.ui.profile

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.dicoding.picodiploma.nugaskuy_ap.R
import com.dicoding.picodiploma.nugaskuy_ap.databinding.FragmentProfileBinding
import com.dicoding.picodiploma.nugaskuy_ap.profil.InformationUserActivity
import com.dicoding.picodiploma.nugaskuy_ap.userclass.MyClassActivity

class ProfileFragment : Fragment() {

    private var _binding: FragmentProfileBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {

        _binding = FragmentProfileBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        binding.kelasCard.setOnClickListener {
            val intent = Intent(context, MyClassActivity::class.java)
            startActivity(intent)
        }
        binding.informasiCard.setOnClickListener {
            val intent = Intent(context, InformationUserActivity::class.java)
            startActivity(intent)
        }

    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}