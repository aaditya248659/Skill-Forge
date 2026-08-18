package com.skillforge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillforge.entity.LearningGoal;
import com.skillforge.entity.User;

@Repository
public interface LearningGoalRepository extends JpaRepository<LearningGoal, Long> {
	
	List<LearningGoal> findByUser(User user);
	
}
