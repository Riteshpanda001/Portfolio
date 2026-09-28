package com.ritesh.portfolio.service;

import com.ritesh.portfolio.dto.ExperienceRequest;
import com.ritesh.portfolio.dto.ExperienceResponse;
import com.ritesh.portfolio.entity.Experience;
import com.ritesh.portfolio.exception.ResourceNotFoundException;
import com.ritesh.portfolio.repository.ExperienceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExperienceService {

    private final ExperienceRepository experienceRepository;

    @Transactional(readOnly = true)
    public List<ExperienceResponse> getAllExperiences() {
        return experienceRepository.findAllByOrderByDisplayOrderAscStartDateDesc().stream()
                .map(ExperienceResponse::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public ExperienceResponse getExperienceById(Long id) {
        Experience exp = experienceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Experience", "id", id));
        return ExperienceResponse.fromEntity(exp);
    }

    @Transactional
    public ExperienceResponse createExperience(ExperienceRequest request) {
        Experience exp = Experience.builder()
                .company(request.company())
                .role(request.role())
                .location(request.location())
                .employmentType(request.employmentType())
                .startDate(request.startDate())
                .endDate(request.endDate())
                .current(request.current() != null ? request.current() : false)
                .description(request.description())
                .highlights(request.highlights())
                .technologiesUsed(request.technologiesUsed())
                .companyLogo(request.companyLogo())
                .displayOrder(request.displayOrder() != null ? request.displayOrder() : 0)
                .build();

        Experience saved = experienceRepository.save(exp);
        return ExperienceResponse.fromEntity(saved);
    }

    @Transactional
    public ExperienceResponse updateExperience(Long id, ExperienceRequest request) {
        Experience exp = experienceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Experience", "id", id));

        exp.setCompany(request.company());
        exp.setRole(request.role());
        exp.setLocation(request.location());
        exp.setEmploymentType(request.employmentType());
        exp.setStartDate(request.startDate());
        exp.setEndDate(request.endDate());
        exp.setCurrent(request.current() != null ? request.current() : false);
        exp.setDescription(request.description());
        exp.setHighlights(request.highlights());
        exp.setTechnologiesUsed(request.technologiesUsed());
        exp.setCompanyLogo(request.companyLogo());
        if (request.displayOrder() != null) exp.setDisplayOrder(request.displayOrder());

        return ExperienceResponse.fromEntity(experienceRepository.save(exp));
    }

    @Transactional
    public void deleteExperience(Long id) {
        if (!experienceRepository.existsById(id)) {
            throw new ResourceNotFoundException("Experience", "id", id);
        }
        experienceRepository.deleteById(id);
    }
}
