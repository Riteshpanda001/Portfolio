package com.ritesh.portfolio.dto;

import com.ritesh.portfolio.entity.Skill;

public record SkillResponse(
        Long id,
        String name,
        String category,
        Integer proficiencyLevel,
        String icon,
        Boolean featured,
        Integer displayOrder
) {
    public static SkillResponse fromEntity(Skill skill) {
        if (skill == null) return null;
        return new SkillResponse(
                skill.getId(),
                skill.getName(),
                skill.getCategory(),
                skill.getProficiencyLevel(),
                skill.getIcon(),
                skill.getFeatured(),
                skill.getDisplayOrder()
        );
    }
}
