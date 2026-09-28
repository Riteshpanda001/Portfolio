package com.ritesh.portfolio.service;

import com.ritesh.portfolio.dto.EducationRequest;
import com.ritesh.portfolio.dto.EducationResponse;
import com.ritesh.portfolio.entity.Education;
import com.ritesh.portfolio.exception.ResourceNotFoundException;
import com.ritesh.portfolio.repository.EducationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EducationService {

    private final EducationRepository educationRepository;

    @Transactional(readOnly = true)
    public List<EducationResponse> getAllEducation() {
        return educationRepository.findAllByOrderByDisplayOrderAscStartDateDesc().stream()
                .map(EducationResponse::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public EducationResponse getEducationById(Long id) {
        Education edu = educationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Education", "id", id));
        return EducationResponse.fromEntity(edu);
    }

    @Transactional
    public EducationResponse createEducation(EducationRequest request) {
        Education edu = Education.builder()
                .institution(request.institution())
                .degree(request.degree())
                .fieldOfStudy(request.fieldOfStudy())
                .location(request.location())
                .startDate(request.startDate())
                .endDate(request.endDate())
                .current(request.current() != null ? request.current() : false)
                .grade(request.grade())
                .description(request.description())
                .displayOrder(request.displayOrder() != null ? request.displayOrder() : 0)
                .build();

        Education saved = educationRepository.save(edu);
        return EducationResponse.fromEntity(saved);
    }

    @Transactional
    public EducationResponse updateEducation(Long id, EducationRequest request) {
        Education edu = educationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Education", "id", id));

        edu.setInstitution(request.institution());
        edu.setDegree(request.degree());
        edu.setFieldOfStudy(request.fieldOfStudy());
        edu.setLocation(request.location());
        edu.setStartDate(request.startDate());
        edu.setEndDate(request.endDate());
        edu.setCurrent(request.current() != null ? request.current() : false);
        edu.setGrade(request.grade());
        edu.setDescription(request.description());
        if (request.displayOrder() != null) edu.setDisplayOrder(request.displayOrder());

        return EducationResponse.fromEntity(educationRepository.save(edu));
    }

    @Transactional
    public void deleteEducation(Long id) {
        if (!educationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Education", "id", id);
        }
        educationRepository.deleteById(id);
    }
}
