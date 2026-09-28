package com.ritesh.portfolio.service;

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
    public List<Skill> getAllSkills(String category) {
        return (category != null && !category.isBlank())
                ? skillRepository.findByCategoryIgnoreCaseOrderByDisplayOrderAscLevelDesc(category)
                : skillRepository.findAllByOrderByDisplayOrderAscLevelDesc();
    }

    /**
     * Return skills grouped by category: {@code { "Frontend": [...], "Backend": [...] }}.
     */
    @Transactional(readOnly = true)
    public Map<String, List<Skill>> getSkillsGroupedByCategory() {
        return skillRepository
                .findAllByOrderByDisplayOrderAscLevelDesc()
                .stream()
                .collect(Collectors.groupingBy(
                        Skill::getCategory,
                        LinkedHashMap::new,
                        Collectors.toList()
                ));
    }

    @Transactional(readOnly = true)
    public Skill getSkillById(Long id) {
        return findOrThrow(id);
    }

    @Transactional
    public Skill createSkill(Skill skill) {
        ValidationUtil.requireNonBlank(skill.getName(), "name");
        ValidationUtil.requireNonBlank(skill.getCategory(), "category");
        ValidationUtil.requireValidSkillLevel(skill.getLevel());
        return skillRepository.save(skill);
    }

    @Transactional
    public Skill updateSkill(Long id, Skill incoming) {
        Skill skill = findOrThrow(id);
        skill.setName(incoming.getName());
        skill.setCategory(incoming.getCategory());
        skill.setLevel(incoming.getLevel());
        skill.setIconUrl(incoming.getIconUrl());
        skill.setDisplayOrder(incoming.getDisplayOrder());
        return skillRepository.save(skill);
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
