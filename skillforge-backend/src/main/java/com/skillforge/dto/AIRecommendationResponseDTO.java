package com.skillforge.dto;

import java.util.List;

public class AIRecommendationResponseDTO {
	
	private String careerSummary;
	private List<String> skillGaps;
	private List<String> recommendedSkills;
	private List<String> learningRoadmap;
	private List<AIRecommendedResourceDTO> recommendedResources;
	
	public AIRecommendationResponseDTO() {
	}

	public AIRecommendationResponseDTO(String careerSummary, List<String> skillGaps, List<String> recommendedSkills,
			List<String> learningRoadmap, List<AIRecommendedResourceDTO> recommendedResources) {
		this.careerSummary = careerSummary;
		this.skillGaps = skillGaps;
		this.recommendedSkills = recommendedSkills;
		this.learningRoadmap = learningRoadmap;
		this.recommendedResources = recommendedResources;
	}

	public String getCareerSummary() {
		return careerSummary;
	}

	public void setCareerSummary(String careerSummary) {
		this.careerSummary = careerSummary;
	}

	public List<String> getSkillGaps() {
		return skillGaps;
	}

	public void setSkillGaps(List<String> skillGaps) {
		this.skillGaps = skillGaps;
	}

	public List<String> getRecommendedSkills() {
		return recommendedSkills;
	}

	public void setRecommendedSkills(List<String> recommendedSkills) {
		this.recommendedSkills = recommendedSkills;
	}

	public List<String> getLearningRoadmap() {
		return learningRoadmap;
	}

	public void setLearningRoadmap(List<String> learningRoadmap) {
		this.learningRoadmap = learningRoadmap;
	}

	public List<AIRecommendedResourceDTO> getRecommendedResources() {
		return recommendedResources;
	}

	public void setRecommendedResources(List<AIRecommendedResourceDTO> recommendedResources) {
		this.recommendedResources = recommendedResources;
	}
}
