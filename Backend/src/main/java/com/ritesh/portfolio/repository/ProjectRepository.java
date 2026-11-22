package com.ritesh.portfolio.repository;

import com.ritesh.portfolio.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    /** All featured projects, ordered by display order then newest first. */
    List<Project> findByIsFeaturedTrueOrderByDisplayOrderAscCreatedAtDesc();

    /** Filter by category (case-insensitive). */
    List<Project> findByCategoryIgnoreCaseOrderByDisplayOrderAscCreatedAtDesc(String category);

    /** All projects sorted by display order. */
    List<Project> findAllByOrderByDisplayOrderAscCreatedAtDesc();

    /** Check if a project with the given title exists. */
    boolean existsByTitle(String title);

    /** Find a project by exact title. */
    Optional<Project> findByTitle(String title);
}
