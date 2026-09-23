package com.ritesh.portfolio.repository;

import com.ritesh.portfolio.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    /** All featured projects, ordered by display order then newest first. */
    List<Project> findByIsFeaturedTrueOrderByDisplayOrderAscCreatedAtDesc();

    /** Filter by category (case-insensitive). */
    List<Project> findByCategoryIgnoreCaseOrderByDisplayOrderAscCreatedAtDesc(String category);

    /** All projects sorted by display order. */
    List<Project> findAllByOrderByDisplayOrderAscCreatedAtDesc();
}
