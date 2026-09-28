package com.ritesh.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Work experience entry.
 */
@Entity
@Table(name = "experiences")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String role;

    @Column(nullable = false, length = 150)
    private String company;

    @Column(length = 200)
    private String location;

    @Column(name = "employment_type", length = 50)
    private String employmentType;     // Full-time, Part-time, Internship, Contract

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "company_url")
    private String companyUrl;

    @Column(name = "company_logo_url")
    private String companyLogoUrl;

    @ElementCollection
    @CollectionTable(name = "experience_technologies",
                     joinColumns = @JoinColumn(name = "experience_id"))
    @Column(name = "technology", length = 60)
    private List<String> technologies;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    /** Null = current / Present */
    @Column(name = "end_date")
    private LocalDate endDate;

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
