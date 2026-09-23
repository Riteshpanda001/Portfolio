package com.ritesh.portfolio.dto;

import com.ritesh.portfolio.entity.Certification;
import java.time.LocalDate;

public record CertificationResponse(
        Long id,
        String title,
        String issuingOrganization,
        LocalDate issueDate,
        LocalDate expirationDate,
        String credentialId,
        String credentialUrl,
        String badgeUrl,
        Integer displayOrder
) {
    public static CertificationResponse fromEntity(Certification cert) {
        if (cert == null) return null;
        return new CertificationResponse(
                cert.getId(),
                cert.getTitle(),
                cert.getIssuingOrganization(),
                cert.getIssueDate(),
                cert.getExpirationDate(),
                cert.getCredentialId(),
                cert.getCredentialUrl(),
                cert.getBadgeUrl(),
                cert.getDisplayOrder()
        );
    }
}
