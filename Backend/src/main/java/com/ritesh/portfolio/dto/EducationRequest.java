package com.ritesh.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;

public record EducationRequest(
        @NotBlank(message = "Institution is required")
        String institution,

        @NotBlank(message = "Degree is required")
        String degree,

        String fieldOfStudy,
        String location,
        LocalDate startDate,
        LocalDate endDate,
        Boolean current,
        String grade,
        String description,
        Integer displayOrder
) {
}
