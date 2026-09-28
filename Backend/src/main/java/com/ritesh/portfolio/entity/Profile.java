package com.ritesh.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Portfolio owner profile — typically one row in the DB.
 */
@Entity
@Table(name = "profiles")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(nullable = false, length = 150)
    private String title;              // e.g. "Full-Stack Developer"

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(length = 200)
    private String location;

    @Column(length = 200)
    private String email;

    @Column(name = "phone_number", length = 30)
    private String phoneNumber;

    @Column(name = "avatar_url")
    private String avatarUrl;

    @Column(name = "resume_url")
    private String resumeUrl;

    @Column(name = "github_url")
    private String githubUrl;

    @Column(name = "linkedin_url")
    private String linkedinUrl;

    @Column(name = "twitter_url")
    private String twitterUrl;

    @Column(name = "website_url")
    private String websiteUrl;

    @ElementCollection
    @CollectionTable(name = "profile_highlights",
                     joinColumns = @JoinColumn(name = "profile_id"))
    @Column(name = "highlight", length = 200)
    private List<String> highlights;   // e.g. "3+ Years Experience"

    @Column(name = "is_available_for_hire")
    @Builder.Default
    private Boolean isAvailableForHire = true;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist  protected void onCreate() { createdAt = updatedAt = LocalDateTime.now(); }
    @PreUpdate   protected void onUpdate() { updatedAt = LocalDateTime.now(); }
}
