package com.ritesh.portfolio.service;

import com.ritesh.portfolio.dto.ProfileRequest;
import com.ritesh.portfolio.dto.ProfileResponse;
import com.ritesh.portfolio.entity.Profile;
import com.ritesh.portfolio.exception.ResourceNotFoundException;
import com.ritesh.portfolio.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;

    @Transactional(readOnly = true)
    public ProfileResponse getProfile() {
        Profile profile = profileRepository.findFirstByOrderByIdAsc()
                .orElseGet(this::createDefaultProfile);
        return ProfileResponse.fromEntity(profile);
    }

    @Transactional
    public ProfileResponse updateProfile(ProfileRequest request) {
        Profile profile = profileRepository.findFirstByOrderByIdAsc()
                .orElseGet(Profile::new);

        profile.setName(request.name());
        profile.setTitle(request.title());
        profile.setBio(request.bio());
        profile.setLocation(request.location());
        profile.setEmail(request.email());
        profile.setPhone(request.phone());
        profile.setGithubUrl(request.githubUrl());
        profile.setLinkedinUrl(request.linkedinUrl());
        profile.setTwitterUrl(request.twitterUrl());
        profile.setAvatarUrl(request.avatarUrl());
        profile.setResumeUrl(request.resumeUrl());
        profile.setHighlights(request.highlights());

        Profile saved = profileRepository.save(profile);
        return ProfileResponse.fromEntity(saved);
    }

    private Profile createDefaultProfile() {
        Profile defaultProfile = Profile.builder()
                .name("Ritesh Panda")
                .title("Full Stack & AI Engineer")
                .bio("Passionate developer crafting modern Web & AI applications.")
                .location("Bhubaneswar, India")
                .email("contact@riteshpanda.com")
                .githubUrl("https://github.com/riteshpanda")
                .linkedinUrl("https://linkedin.com/in/riteshpanda")
                .build();
        return profileRepository.save(defaultProfile);
    }
}
