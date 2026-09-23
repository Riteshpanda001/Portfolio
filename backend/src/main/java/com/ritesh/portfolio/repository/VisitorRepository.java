package com.ritesh.portfolio.repository;

import com.ritesh.portfolio.entity.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface VisitorRepository extends JpaRepository<Visitor, Long> {
    long countByVisitedAtAfter(LocalDateTime dateTime);
}
