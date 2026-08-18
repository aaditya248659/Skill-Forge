package com.skillforge.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillforge.dto.CreateProjectRequestDTO;
import com.skillforge.dto.ProjectResponseDTO;
import com.skillforge.service.ProjectService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*")
public class ProjectController {
	
	@Autowired
	private ProjectService projectService;
	
	// Add new project
	@PostMapping
	public ResponseEntity<ProjectResponseDTO> addProject(
			@Valid @RequestBody CreateProjectRequestDTO request) {
		
		ProjectResponseDTO response = projectService.addProject(request);
		
		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}
	
	// Get all projects of Logged-in User
	@GetMapping
	public ResponseEntity<List<ProjectResponseDTO>> getMyProjects() {
		
		List<ProjectResponseDTO> projects = projectService.getMyProjects();
		
		return ResponseEntity.ok(projects);
	}
	
	// Get one project by ID
	@GetMapping("/{projectId}")
	public ResponseEntity<ProjectResponseDTO> getProjectById(
			@PathVariable Long projectId) {
		
		ProjectResponseDTO response = 
				projectService.getProjectsById(projectId);
		
		return ResponseEntity.ok(response);
	}
	
	//Update Project
	@PutMapping("{projectId}")
	public ResponseEntity<ProjectResponseDTO> updateProject(
			@PathVariable Long projectId,
			@Valid @RequestBody CreateProjectRequestDTO request) {
		
		ProjectResponseDTO response = 
				projectService.updateProject(projectId, request);
		
		return ResponseEntity.ok(response);
	}
	
	// Delete project
	@DeleteMapping("{projectId}")
	public ResponseEntity<Void> deleteProject(
			@PathVariable Long projectId) {
		
		projectService.deleteProject(projectId);
		
		return ResponseEntity.noContent().build();
	}
}
