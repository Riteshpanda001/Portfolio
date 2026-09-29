package com.ritesh.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * Tech skill entity.
 */
@Entity
@Table(name = "skills")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 50)
    private String category;           // e.g. Frontend, Backend, DevOps

    /** Proficiency 0–100 */
    @Column(nullable = false)
    @Builder.Default
    private Integer level = 80;

    @Column(name = "icon_url")
    private String iconUrl;

    @Column(name = "is_featured")
    @Builder.Default
    private Boolean featured = false;

    @Column(name = "display_order")
    @Builder.Default
    private Integer displayOrder = 0;

    public Integer getProficiencyLevel() { return level; }
    public void setProficiencyLevel(Integer l) { this.level = l; }

    public String getIcon() { return iconUrl; }
    public void setIcon(String icon) { this.iconUrl = icon; }

    public Boolean getFeatured() { return featured; }
    public void setFeatured(Boolean f) { this.featured = f; }

    public static class SkillBuilder {
        public SkillBuilder proficiencyLevel(Integer proficiencyLevel) {
            return this.level(proficiencyLevel);
        }
        public SkillBuilder icon(String icon) {
            return this.iconUrl(icon);
        }
    }

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist  protected void onCreate() { createdAt = updatedAt = LocalDateTime.now(); }
    @PreUpdate   protected void onUpdate() { updatedAt = LocalDateTime.now(); }
}
