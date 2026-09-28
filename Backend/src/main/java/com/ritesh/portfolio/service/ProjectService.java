package com.ritesh.portfolio.service;

import com.ritesh.portfolio.dto.ProjectRequest;
import com.ritesh.portfolio.dto.ProjectResponse;
import com.ritesh.portfolio.entity.Project;
import com.ritesh.portfolio.exception.ResourceNotFoundException;
import com.ritesh.portfolio.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Project CRUD service.
 */
@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;

    // ── Public reads ──────────────────────────────────────────

    @Transactional(readOnly = true)
    public List<ProjectResponse> getAllProjects(String category) {
        List<Project> projects = (category != null && !category.isBlank())
                ? projectRepository
                    .findByCategoryIgnoreCaseOrderByDisplayOrderAscCreatedAtDesc(category)
                : projectRepository
                    .findAllByOrderByDisplayOrderAscCreatedAtDesc();
        return projects.stream().map(ProjectResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public List<ProjectResponse> getFeaturedProjects() {
        return projectRepository
                .findByIsFeaturedTrueOrderByDisplayOrderAscCreatedAtDesc()
                .stream().map(ProjectResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public ProjectResponse getProjectById(Long id) {
        return ProjectResponse.from(findOrThrow(id));
    }

    // ── Admin mutations ───────────────────────────────────────

    @Transactional
    public ProjectResponse createProject(ProjectRequest req) {
        Project project = Project.builder()
                .title(req.title())
                .description(req.description())
                .longDescription(req.longDescription())
                .githubUrl(req.githubUrl())
                .liveUrl(req.liveUrl())
                .imageUrl(req.imageUrl())
                .tags(req.tags())
                .features(req.features())
                .category(req.category())
                .isFeatured(req.isFeatured() != null ? req.isFeatured() : false)
                .displayOrder(req.displayOrder() != null ? req.displayOrder() : 0)
                .startDate(req.startDate())
                .endDate(req.endDate())
                .build();
        return ProjectResponse.from(projectRepository.save(project));
    }

    @Transactional
    public ProjectResponse updateProject(Long id, ProjectRequest req) {
        Project project = findOrThrow(id);
        project.setTitle(req.title());
        project.setDescription(req.description());
        project.setLongDescription(req.longDescription());
        project.setGithubUrl(req.githubUrl());
        project.setLiveUrl(req.liveUrl());
        project.setImageUrl(req.imageUrl());
        project.setTags(req.tags());
        project.setFeatures(req.features());
        project.setCategory(req.category());
        if (req.isFeatured()     != null) project.setIsFeatured(req.isFeatured());
        if (req.displayOrder()   != null) project.setDisplayOrder(req.displayOrder());
        project.setStartDate(req.startDate());
        project.setEndDate(req.endDate());
        return ProjectResponse.from(projectRepository.save(project));
    }

    @Transactional
    public void deleteProject(Long id) {
        projectRepository.delete(findOrThrow(id));
    }

    // ── Helper ────────────────────────────────────────────────

    private Project findOrThrow(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", id));
    }
}
