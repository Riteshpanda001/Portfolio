package com.ritesh.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;

public record CertificationRequest(
        @NotBlank(message = "Title is required")
        String title,

        @NotBlank(message = "Issuing Organization is required")
        String issuingOrganization,

        LocalDate issueDate,
        LocalDate expirationDate,
        String credentialId,
        String credentialUrl,
        String badgeUrl,
        Integer displayOrder
) {
}
