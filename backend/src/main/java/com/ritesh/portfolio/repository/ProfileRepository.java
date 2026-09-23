package com.ritesh.portfolio.repository;

import com.ritesh.portfolio.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {

    /** Return the first (and typically only) profile row. */
    Optional<Profile> findFirstByOrderByIdAsc();
}
