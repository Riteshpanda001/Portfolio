package com.ritesh.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;

/**
 * Payload for creating / updating a Project.
 */
public record ProjectRequest(

        @NotBlank(message = "Title is required")
        @Size(max = 200, message = "Title must not exceed 200 characters")
        String title,

        @NotBlank(message = "Description is required")
        @Size(max = 1000, message = "Description must not exceed 1000 characters")
        String description,

        String longDescription,

        String githubUrl,

        String liveUrl,

        String imageUrl,

        List<String> tags,

        List<String> features,

        String category,

        Boolean isFeatured,

        Integer displayOrder,

        LocalDate startDate,

        LocalDate endDate
) {}
