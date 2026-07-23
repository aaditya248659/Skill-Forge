package com.skillforge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillforge.entity.Resume;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {

}
