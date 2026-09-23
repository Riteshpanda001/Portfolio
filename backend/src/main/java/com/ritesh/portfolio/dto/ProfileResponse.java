package com.ritesh.portfolio.dto;

import com.ritesh.portfolio.entity.Profile;

import java.util.List;

/**
 * Public-facing profile response.
 */
public record ProfileResponse(
        Long id,
        String name,
        String title,
        String bio,
        String location,
        String email,
        String avatarUrl,
        String resumeUrl,
        String githubUrl,
        String linkedinUrl,
        String twitterUrl,
        String websiteUrl,
        List<String> highlights,
        Boolean isAvailableForHire
) {
    public static ProfileResponse from(Profile p) {
        return new ProfileResponse(
                p.getId(), p.getName(), p.getTitle(), p.getBio(),
                p.getLocation(), p.getEmail(), p.getAvatarUrl(),
                p.getResumeUrl(), p.getGithubUrl(), p.getLinkedinUrl(),
                p.getTwitterUrl(), p.getWebsiteUrl(),
                p.getHighlights(), p.getIsAvailableForHire()
        );
    }
}
