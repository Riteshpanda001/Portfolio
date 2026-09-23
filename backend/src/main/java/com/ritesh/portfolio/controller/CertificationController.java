package com.ritesh.portfolio.controller;

import com.ritesh.portfolio.dto.CertificationRequest;
import com.ritesh.portfolio.dto.CertificationResponse;
import com.ritesh.portfolio.service.CertificationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certifications")
@RequiredArgsConstructor
public class CertificationController {

    private final CertificationService certificationService;

    @GetMapping
    public ResponseEntity<List<CertificationResponse>> getAllCertifications() {
        return ResponseEntity.ok(certificationService.getAllCertifications());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CertificationResponse> getCertificationById(@PathVariable Long id) {
        return ResponseEntity.ok(certificationService.getCertificationById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CertificationResponse> createCertification(@Valid @RequestBody CertificationRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(certificationService.createCertification(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CertificationResponse> updateCertification(@PathVariable Long id, @Valid @RequestBody CertificationRequest request) {
        return ResponseEntity.ok(certificationService.updateCertification(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteCertification(@PathVariable Long id) {
        certificationService.deleteCertification(id);
        return ResponseEntity.noContent().build();
    }
}
