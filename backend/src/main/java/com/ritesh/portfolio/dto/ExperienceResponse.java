package com.ritesh.portfolio.dto;

import com.ritesh.portfolio.entity.Experience;
import java.time.LocalDate;
import java.util.List;

public record ExperienceResponse(
        Long id,
        String company,
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
    public static ExperienceResponse fromEntity(Experience exp) {
        if (exp == null) return null;
        return new ExperienceResponse(
                exp.getId(),
                exp.getCompany(),
                exp.getRole(),
                exp.getLocation(),
                exp.getEmploymentType(),
                exp.getStartDate(),
                exp.getEndDate(),
                exp.getCurrent(),
                exp.getDescription(),
                exp.getHighlights(),
                exp.getTechnologiesUsed(),
                exp.getCompanyLogo(),
                exp.getDisplayOrder()
        );
    }
}
