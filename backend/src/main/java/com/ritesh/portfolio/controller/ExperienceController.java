package com.ritesh.portfolio.controller;

import com.ritesh.portfolio.dto.ExperienceRequest;
import com.ritesh.portfolio.dto.ExperienceResponse;
import com.ritesh.portfolio.service.ExperienceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/experience")
@RequiredArgsConstructor
public class ExperienceController {

    private final ExperienceService experienceService;

    @GetMapping
    public ResponseEntity<List<ExperienceResponse>> getAllExperiences() {
        return ResponseEntity.ok(experienceService.getAllExperiences());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExperienceResponse> getExperienceById(@PathVariable Long id) {
        return ResponseEntity.ok(experienceService.getExperienceById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ExperienceResponse> createExperience(@Valid @RequestBody ExperienceRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(experienceService.createExperience(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ExperienceResponse> updateExperience(@PathVariable Long id, @Valid @RequestBody ExperienceRequest request) {
        return ResponseEntity.ok(experienceService.updateExperience(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteExperience(@PathVariable Long id) {
        experienceService.deleteExperience(id);
        return ResponseEntity.noContent().build();
    }
}
