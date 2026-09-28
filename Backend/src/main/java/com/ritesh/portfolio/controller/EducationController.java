package com.ritesh.portfolio.controller;

import com.ritesh.portfolio.dto.EducationRequest;
import com.ritesh.portfolio.dto.EducationResponse;
import com.ritesh.portfolio.service.EducationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/education")
@RequiredArgsConstructor
public class EducationController {

    private final EducationService educationService;

    @GetMapping
    public ResponseEntity<List<EducationResponse>> getAllEducation() {
        return ResponseEntity.ok(educationService.getAllEducation());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EducationResponse> getEducationById(@PathVariable Long id) {
        return ResponseEntity.ok(educationService.getEducationById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<EducationResponse> createEducation(@Valid @RequestBody EducationRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(educationService.createEducation(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<EducationResponse> updateEducation(@PathVariable Long id, @Valid @RequestBody EducationRequest request) {
        return ResponseEntity.ok(educationService.updateEducation(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteEducation(@PathVariable Long id) {
        educationService.deleteEducation(id);
        return ResponseEntity.noContent().build();
    }
}
