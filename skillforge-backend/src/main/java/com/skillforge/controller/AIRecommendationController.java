package com.skillforge.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillforge.dto.AIRecommendationResponseDTO;
import com.skillforge.service.AIRecommendationService;

@RestController
@RequestMapping("/api/ai")
public class AIRecommendationController {
	
	@Autowired
	private AIRecommendationService aiRecommendationService;
	
	@GetMapping("/recommendations")
	public ResponseEntity<AIRecommendationResponseDTO> getRecommendations() {
		
		return ResponseEntity.ok(
				aiRecommendationService.getRecommendations());
	}
}
