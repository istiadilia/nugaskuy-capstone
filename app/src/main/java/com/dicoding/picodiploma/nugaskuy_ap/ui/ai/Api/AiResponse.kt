package com.example.kamera.ai.api

import com.google.gson.annotations.SerializedName

data class AiResponse(
    @field:SerializedName("category_name")
    val categoryName: String,

    @field:SerializedName("category_type")
    val categoryType: Boolean,

    @field:SerializedName("path")
    val path: String
)
