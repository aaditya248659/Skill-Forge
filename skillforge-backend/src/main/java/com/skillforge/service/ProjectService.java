package com.skillforge.service;

import java.util.List;

import com.skillforge.dto.CreateProjectRequestDTO;
import com.skillforge.dto.ProjectResponseDTO;

public interface ProjectService {
	
	ProjectResponseDTO addProject(CreateProjectRequestDTO request);
	
	List<ProjectResponseDTO> getMyProjects();
	
	ProjectResponseDTO getProjectsById(Long projectId);
	
	ProjectResponseDTO updateProject(Long projectId,
									CreateProjectRequestDTO request);
	
	void deleteProject(Long projectId);
}
