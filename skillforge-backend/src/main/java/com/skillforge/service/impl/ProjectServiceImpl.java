package com.skillforge.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.skillforge.dto.CreateProjectRequestDTO;
import com.skillforge.dto.ProjectResponseDTO;
import com.skillforge.entity.Project;
import com.skillforge.entity.User;
import com.skillforge.exception.ResourceNotFoundException;
import com.skillforge.repository.ProjectRepository;
import com.skillforge.repository.UserRepository;
import com.skillforge.service.ProjectService;

@Service
public class ProjectServiceImpl implements ProjectService {
	
	@Autowired
	private ProjectRepository projectRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public ProjectResponseDTO addProject(CreateProjectRequestDTO request) {
		User user = getLoggedInUser();
		Project project = new Project();
		
		project.setProjectTitle(request.getProjectTitle());
		project.setDescription(request.getDescription());
		project.setTechnologyUsed(request.getTechnologyUsed());
		project.setProjectLink(request.getProjectLink());
		project.setGithubLink(request.getGithubLink());
		project.setStartDate(request.getStartDate());
		project.setEndDate(request.getEndDate());
		project.setUser(user);
		
		Project savedProject = projectRepository.save(project);
		return convertToResponse(savedProject);
	}
	
	@Override
	public List<ProjectResponseDTO> getMyProjects() {
		User user = getLoggedInUser();
		return projectRepository.findByUser(user)
				.stream()
				.map(this::convertToResponse)
				.collect(Collectors.toList());
	}
	
	@Override
	public ProjectResponseDTO getProjectsById(Long projectId) {
		User user = getLoggedInUser();
		Project project = projectRepository.findById(projectId)
				.orElseThrow(() -> new ResourceNotFoundException("Project not found"));
		
		if (!project.getUser().getUserId().equals(user.getUserId())) {
			throw new ResourceNotFoundException("Project not found");
		}
		return convertToResponse(project);
	}
	
	@Override
	public ProjectResponseDTO updateProject(Long projectId, CreateProjectRequestDTO request) {
		User user = getLoggedInUser();
		Project project = projectRepository.findById(projectId)
				.orElseThrow(() -> new ResourceNotFoundException("Project not found"));
                        
		if (!project.getUser().getUserId().equals(user.getUserId())) {
			throw new ResourceNotFoundException("Project not found");
		}
		
		project.setProjectTitle(request.getProjectTitle());
		project.setDescription(request.getDescription());
		project.setTechnologyUsed(request.getTechnologyUsed());
		project.setProjectLink(request.getProjectLink());
		project.setGithubLink(request.getGithubLink());
		project.setStartDate(request.getStartDate());
		project.setEndDate(request.getEndDate());
		
		Project updatedProject = projectRepository.save(project);
		return convertToResponse(updatedProject);
	}
	
	@Override
	public void deleteProject(Long projectId) {
		User user = getLoggedInUser();
		Project project = projectRepository.findById(projectId)
				.orElseThrow(() -> new ResourceNotFoundException("Project not found"));
		
		if (!project.getUser().getUserId().equals(user.getUserId())) {
			throw new ResourceNotFoundException("Project not found");
		}
		projectRepository.delete(project);
	}
	
	private User getLoggedInUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = authentication.getName();
		
		return userRepository.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("User not found"));
	}
	
	private ProjectResponseDTO convertToResponse(Project project) {
		ProjectResponseDTO response = new ProjectResponseDTO();
		
		response.setProjectId(project.getProjectId());
		response.setUserId(project.getUser().getUserId());
		response.setFullName(project.getUser().getFullName());
		response.setProjectTitle(project.getProjectTitle());
		response.setDescription(project.getDescription());
		response.setTechnologyUsed(project.getTechnologyUsed());
		response.setProjectlink(project.getProjectLink());
		response.setGithubLink(project.getGithubLink());
		response.setStartDate(project.getStartDate());
		response.setEndDate(project.getEndDate());
		
		return response;
	}
}