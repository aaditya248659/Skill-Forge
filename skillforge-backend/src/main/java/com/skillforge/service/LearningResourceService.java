package com.skillforge.service;

import java.util.List;

import com.skillforge.dto.LearningResourceRequestDTO;
import com.skillforge.dto.LearningResourceResponseDTO;

public interface LearningResourceService {
	
	LearningResourceResponseDTO addResource(
			LearningResourceRequestDTO requestDTO);
	
	List<LearningResourceResponseDTO> getMyResources();
	
	LearningResourceResponseDTO getResourceById(Long resourceId);
	
	LearningResourceResponseDTO updateResource(
			Long resourceId,
			LearningResourceRequestDTO requestDTO);
	
	void deleteResource(Long resourceId);
}
