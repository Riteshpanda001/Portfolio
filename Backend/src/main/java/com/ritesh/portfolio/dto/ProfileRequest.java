package com.ritesh.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.List;

public record ProfileRequest(
        @NotBlank(message = "Name is required")
        String name,

        @NotBlank(message = "Title is required")
        String title,

        String bio,
        String location,
        String email,
        String phone,
        String githubUrl,
        String linkedinUrl,
        String twitterUrl,
        String avatarUrl,
        String resumeUrl,
        List<String> highlights
) {
}
