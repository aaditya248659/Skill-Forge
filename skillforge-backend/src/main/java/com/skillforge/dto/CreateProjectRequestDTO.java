package com.skillforge.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;

public class CreateProjectRequestDTO {
	
	@NotBlank(message = "Project title is required")
	private String projectTitle;
	
	private String description;
	private String technologyUsed;
	private String projectLink;
	private String githubLink;
	private LocalDate startDate;
	private LocalDate endDate;
	
	public CreateProjectRequestDTO() {
	}

	public CreateProjectRequestDTO(String projectTitle, String description, String technologyUsed, String projectLink,
			String githubLink, LocalDate startDate, LocalDate endDate) {
		super();
		this.projectTitle = projectTitle;
		this.description = description;
		this.technologyUsed = technologyUsed;
		this.projectLink = projectLink;
		this.githubLink = githubLink;
		this.startDate = startDate;
		this.endDate = endDate;
	}

	public String getProjectTitle() {
		return projectTitle;
	}

	public void setProjectTitle(String projectTitle) {
		this.projectTitle = projectTitle;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getTechnologyUsed() {
		return technologyUsed;
	}

	public void setTechnologyUsed(String technologyUsed) {
		this.technologyUsed = technologyUsed;
	}

	public String getProjectLink() {
		return projectLink;
	}

	public void setProjectLink(String projectLink) {
		this.projectLink = projectLink;
	}

	public String getGithubLink() {
		return githubLink;
	}

	public void setGithubLink(String githubLink) {
		this.githubLink = githubLink;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}
}
