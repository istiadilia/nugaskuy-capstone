package com.dicoding.picodiploma.nugaskuy_ap.ui.mentoring

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import com.dicoding.picodiploma.nugaskuy_ap.databinding.FragmentMentoringBinding

class MentoringFragment : Fragment() {

    private var _binding: FragmentMentoringBinding? = null

    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {

        _binding = FragmentMentoringBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.matpel1.setOnClickListener { toastFunc() }
        binding.matpel2.setOnClickListener { toastFunc() }
        binding.matpel3.setOnClickListener { toastFunc() }
    }

    private fun toastFunc() {
        Toast.makeText(requireContext(), "Maaf, fitur belum tersedia", Toast.LENGTH_SHORT).show()
    }
    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}