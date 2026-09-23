package com.ritesh.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Academic education entry.
 */
@Entity
@Table(name = "education")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 250)
    private String degree;

    @Column(nullable = false, length = 200)
    private String institution;

    @Column(length = 150)
    private String location;

    @Column(length = 100)
    private String grade;              // e.g. CGPA: 8.6 / 10

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "institution_url")
    private String institutionUrl;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

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
