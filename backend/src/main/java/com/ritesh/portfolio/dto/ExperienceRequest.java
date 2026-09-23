package com.ritesh.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.util.List;

public record ExperienceRequest(
        @NotBlank(message = "Company is required")
        String company,

        @NotBlank(message = "Role is required")
        String role,

        String location,
        String employmentType,
        LocalDate startDate,
        LocalDate endDate,
        Boolean current,
        String description,
        List<String> highlights,
        List<String> technologiesUsed,
        String companyLogo,
        Integer displayOrder
) {
}
