package com.ritesh.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Industry certification / credential.
 */
@Entity
@Table(name = "certifications")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Certification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 250)
    private String name;

    @Column(nullable = false, length = 150)
    private String issuer;

    @Column(name = "credential_id", length = 100)
    private String credentialId;

    @Column(name = "credential_url", length = 500)
    private String credentialUrl;

    @Column(name = "badge_url")
    private String badgeUrl;

    @Column(name = "issue_date", nullable = false)
    private LocalDate issueDate;

    /** Null = never expires */
    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    @Column(name = "display_order")
    @Builder.Default
    private Integer displayOrder = 0;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist  protected void onCreate() { createdAt = updatedAt = LocalDateTime.now(); }
    @PreUpdate   protected void onUpdate() { updatedAt = LocalDateTime.now(); }
}
