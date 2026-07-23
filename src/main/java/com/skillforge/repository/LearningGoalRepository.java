package com.skillforge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillforge.entity.LearningGoal;

@Repository
public interface LearningGoalRepository extends JpaRepository<LearningGoal, Long> {

}
