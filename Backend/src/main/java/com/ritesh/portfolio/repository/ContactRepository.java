package com.ritesh.portfolio.repository;

import com.ritesh.portfolio.entity.ContactMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepository extends JpaRepository<ContactMessage, Long> {

    Page<ContactMessage> findAllByOrderByCreatedAtDesc(Pageable pageable);

    Page<ContactMessage> findByIsReadFalseOrderByCreatedAtDesc(Pageable pageable);

    long countByIsReadFalse();
}
