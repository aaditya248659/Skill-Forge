package com.skillforge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillforge.entity.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
}
