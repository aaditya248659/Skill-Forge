package com.skillforge.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillforge.entity.Resume;
import com.skillforge.entity.User;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {
	
	Optional<Resume> findByUser(User user);
	
}
