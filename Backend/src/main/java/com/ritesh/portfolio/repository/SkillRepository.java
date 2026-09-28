package com.ritesh.portfolio.repository;

import com.ritesh.portfolio.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {

    List<Skill> findAllByOrderByDisplayOrderAscLevelDesc();

    List<Skill> findByCategoryIgnoreCaseOrderByDisplayOrderAscLevelDesc(String category);

    List<String> findDistinctCategoryBy();
}
