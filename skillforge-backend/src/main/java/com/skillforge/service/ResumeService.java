package com.skillforge.service;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.skillforge.dto.ResumeResponseDTO;

public interface ResumeService {
	
	ResumeResponseDTO uploadResume(
			String resumeTitle,
			MultipartFile file);
	
	ResumeResponseDTO getMyResume();
	
	ResumeResponseDTO updateResume(
			String resumeTitle,
			MultipartFile file);
	
	void applyResumeData();
	
	void deleteResume();
	
	ResumeResponseDTO extractResumeData();
	
	ResponseEntity<?> viewResume();
}
