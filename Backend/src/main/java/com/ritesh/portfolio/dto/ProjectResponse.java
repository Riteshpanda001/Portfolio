package com.ritesh.portfolio.dto;

import com.ritesh.portfolio.entity.Project;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Public-facing project response.
 */
public record ProjectResponse(
        Long id,
        String title,
        String description,
        String longDescription,
        String githubUrl,
        String liveUrl,
        String imageUrl,
        List<String> tags,
        List<String> features,
        String category,
        Boolean isFeatured,
        Integer displayOrder,
        LocalDate startDate,
        LocalDate endDate,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    /** Map entity → DTO. */
    public static ProjectResponse from(Project p) {
        return new ProjectResponse(
                p.getId(), p.getTitle(), p.getDescription(), p.getLongDescription(),
                p.getGithubUrl(), p.getLiveUrl(), p.getImageUrl(),
                p.getTags(), p.getFeatures(), p.getCategory(),
                p.getIsFeatured(), p.getDisplayOrder(),
                p.getStartDate(), p.getEndDate(),
                p.getCreatedAt(), p.getUpdatedAt()
        );
    }
}
