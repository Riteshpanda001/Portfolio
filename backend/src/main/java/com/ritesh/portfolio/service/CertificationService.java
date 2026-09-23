package com.ritesh.portfolio.service;

import com.ritesh.portfolio.dto.CertificationRequest;
import com.ritesh.portfolio.dto.CertificationResponse;
import com.ritesh.portfolio.entity.Certification;
import com.ritesh.portfolio.exception.ResourceNotFoundException;
import com.ritesh.portfolio.repository.CertificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CertificationService {

    private final CertificationRepository certificationRepository;

    @Transactional(readOnly = true)
    public List<CertificationResponse> getAllCertifications() {
        return certificationRepository.findAllByOrderByDisplayOrderAscIssueDateDesc().stream()
                .map(CertificationResponse::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public CertificationResponse getCertificationById(Long id) {
        Certification cert = certificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Certification", "id", id));
        return CertificationResponse.fromEntity(cert);
    }

    @Transactional
    public CertificationResponse createCertification(CertificationRequest request) {
        Certification cert = Certification.builder()
                .title(request.title())
                .issuingOrganization(request.issuingOrganization())
                .issueDate(request.issueDate())
                .expirationDate(request.expirationDate())
                .credentialId(request.credentialId())
                .credentialUrl(request.credentialUrl())
                .badgeUrl(request.badgeUrl())
                .displayOrder(request.displayOrder() != null ? request.displayOrder() : 0)
                .build();

        return CertificationResponse.fromEntity(certificationRepository.save(cert));
    }

    @Transactional
    public CertificationResponse updateCertification(Long id, CertificationRequest request) {
        Certification cert = certificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Certification", "id", id));

        cert.setTitle(request.title());
        cert.setIssuingOrganization(request.issuingOrganization());
        cert.setIssueDate(request.issueDate());
        cert.setExpirationDate(request.expirationDate());
        cert.setCredentialId(request.credentialId());
        cert.setCredentialUrl(request.credentialUrl());
        cert.setBadgeUrl(request.badgeUrl());
        if (request.displayOrder() != null) cert.setDisplayOrder(request.displayOrder());

        return CertificationResponse.fromEntity(certificationRepository.save(cert));
    }

    @Transactional
    public void deleteCertification(Long id) {
        if (!certificationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Certification", "id", id);
        }
        certificationRepository.deleteById(id);
    }
}
