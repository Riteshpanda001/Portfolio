package com.ritesh.portfolio.service;

import com.ritesh.portfolio.dto.SkillRequest;
import com.ritesh.portfolio.dto.SkillResponse;
import com.ritesh.portfolio.entity.Skill;
import com.ritesh.portfolio.exception.ResourceNotFoundException;
import com.ritesh.portfolio.repository.SkillRepository;
import com.ritesh.portfolio.util.ValidationUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Skill CRUD service.
 */
@Service
@RequiredArgsConstructor
public class SkillService {

    private final SkillRepository skillRepository;

    @Transactional(readOnly = true)
    public List<SkillResponse> getAllSkills() {
        return skillRepository.findAllByOrderByDisplayOrderAscLevelDesc().stream()
                .map(SkillResponse::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<SkillResponse> getAllSkills(String category) {
        List<Skill> list = (category != null && !category.isBlank())
                ? skillRepository.findByCategoryIgnoreCaseOrderByDisplayOrderAscLevelDesc(category)
                : skillRepository.findAllByOrderByDisplayOrderAscLevelDesc();
        return list.stream().map(SkillResponse::fromEntity).toList();
    }

    /**
     * Return skills grouped by category: {@code { "Frontend": [...], "Backend": [...] }}.
     */
    @Transactional(readOnly = true)
    public Map<String, List<SkillResponse>> getSkillsGroupedByCategory() {
        return skillRepository
                .findAllByOrderByDisplayOrderAscLevelDesc()
                .stream()
                .collect(Collectors.groupingBy(
                        Skill::getCategory,
                        LinkedHashMap::new,
                        Collectors.mapping(SkillResponse::fromEntity, Collectors.toList())
                ));
    }

    @Transactional(readOnly = true)
    public SkillResponse getSkillById(Long id) {
        return SkillResponse.fromEntity(findOrThrow(id));
    }

    @Transactional
    public SkillResponse createSkill(SkillRequest request) {
        ValidationUtil.requireNonBlank(request.name(), "name");
        ValidationUtil.requireNonBlank(request.category(), "category");
        Skill skill = Skill.builder()
                .name(request.name())
                .category(request.category())
                .level(request.proficiencyLevel() != null ? request.proficiencyLevel() : 80)
                .iconUrl(request.icon())
                .featured(request.featured() != null ? request.featured() : false)
                .displayOrder(request.displayOrder() != null ? request.displayOrder() : 0)
                .build();
        return SkillResponse.fromEntity(skillRepository.save(skill));
    }

    @Transactional
    public SkillResponse updateSkill(Long id, SkillRequest request) {
        Skill skill = findOrThrow(id);
        skill.setName(request.name());
        skill.setCategory(request.category());
        if (request.proficiencyLevel() != null) skill.setLevel(request.proficiencyLevel());
        if (request.icon() != null) skill.setIconUrl(request.icon());
        if (request.featured() != null) skill.setFeatured(request.featured());
        if (request.displayOrder() != null) skill.setDisplayOrder(request.displayOrder());
        return SkillResponse.fromEntity(skillRepository.save(skill));
    }

    @Transactional
    public void deleteSkill(Long id) {
        skillRepository.delete(findOrThrow(id));
    }

    private Skill findOrThrow(Long id) {
        return skillRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill", "id", id));
    }
}
