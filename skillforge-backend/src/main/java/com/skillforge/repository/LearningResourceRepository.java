package com.skillforge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillforge.entity.LearningResource;

@Repository
public interface LearningResourceRepository extends JpaRepository<LearningResource, Long> {
	
	List<LearningResource> findByUserUserId(Long userId);
}
