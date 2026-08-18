package com.skillforge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillforge.entity.Project;
import com.skillforge.entity.User;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
	
	List<Project> findByUser(User user);
}
