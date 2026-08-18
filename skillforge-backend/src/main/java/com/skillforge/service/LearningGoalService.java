package com.skillforge.service;

import java.util.List;

import com.skillforge.dto.LearningGoalRequestDTO;
import com.skillforge.dto.LearningGoalResponseDTO;

public interface LearningGoalService {
	
	LearningGoalResponseDTO addGoal(
			LearningGoalRequestDTO requestDTO);
	
	List<LearningGoalResponseDTO> getMyGoals();
	
	LearningGoalResponseDTO getGoalById(Long goalId);
	
	LearningGoalResponseDTO updateGoal(
			Long goalId,
			LearningGoalRequestDTO requestDTO);
	
	void deleteGoal(Long goalId);
}
