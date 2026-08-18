package com.skillforge.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "projects")
public class Project {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "project_id")
	private Long projectId;
	
	@Column(name = "project_title", nullable = false, length = 150)
	private String projectTitle;
	
	@Column(name = "description", length = 1000)
	private String description;
	
	@Column(name = "technology_used", length = 255)
	private String technologyUsed;
	
	@Column(name = "project_link", length = 255)
	private String projectLink;
	
	@Column(name = "github_link", length = 255)
	private String githubLink;
	
	@Column(name = "start_date")
	private LocalDate startDate;
	
	@Column(name = "end_date")
	private LocalDate endDate;
	
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;
	
	public Project() {
	}
	
	public Project(String projectTitle, String description,
			String technologyUsed,
			String projectLink,
			String githubLink,
			LocalDate startDate,
			LocalDate endDate,
			User user) {
		this.projectTitle = projectTitle;
		this.description = description;
		this.technologyUsed = technologyUsed;
		this.projectLink = projectLink;
		this.githubLink = githubLink;
		this.startDate = startDate;
		this.endDate = endDate;
		this.user = user;
	}
	
	public Long getProjectId() {
		return projectId;
	}
	
	public void setProjectId(Long projectId) {
		this.projectId = projectId;
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
	
	public User getUser() {
		return user;
	}
	
	public void setUser(User user) {
		this.user = user;
	}
}