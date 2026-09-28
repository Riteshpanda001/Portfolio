package com.ritesh.portfolio.dto;

import com.ritesh.portfolio.entity.Skill;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SkillRequest(
        @NotBlank(message = "Skill name is required")
        @Size(max = 100, message = "Name must not exceed 100 characters")
        String name,

        @NotBlank(message = "Category is required")
        String category,

        @Min(value = 1, message = "Proficiency level must be at least 1")
        @Max(value = 100, message = "Proficiency level cannot exceed 100")
        Integer proficiencyLevel,

        String icon,

        Boolean featured,

        Integer displayOrder
) {
}
