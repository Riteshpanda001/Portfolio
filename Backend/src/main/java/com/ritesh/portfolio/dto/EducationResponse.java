package com.ritesh.portfolio.dto;

import com.ritesh.portfolio.entity.Education;
import java.time.LocalDate;

public record EducationResponse(
        Long id,
        String institution,
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
    public static EducationResponse fromEntity(Education edu) {
        if (edu == null) return null;
        return new EducationResponse(
                edu.getId(),
                edu.getInstitution(),
                edu.getDegree(),
                edu.getFieldOfStudy(),
                edu.getLocation(),
                edu.getStartDate(),
                edu.getEndDate(),
                edu.getCurrent(),
                edu.getGrade(),
                edu.getDescription(),
                edu.getDisplayOrder()
        );
    }
}
