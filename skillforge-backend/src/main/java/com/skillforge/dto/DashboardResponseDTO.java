package com.skillforge.dto;

import com.skillforge.enums.ProfileType;

public class DashboardResponseDTO {
	
	private Long userId;
	private String fullName;
	private String email;
	private ProfileType profileType;
	
	private long totalSkills;
	private long totalProjects;
	private long totalCertificates;
	private long totalLearningResources;
	private long totalLearningGoals;
	
	private long completedGoals;
	private double averageGoalProgress;
	
	private boolean hasResume;

	public DashboardResponseDTO() {
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public ProfileType getProfileType() {
		return profileType;
	}

	public void setProfileType(ProfileType profileType) {
		this.profileType = profileType;
	}

	public long getTotalSkills() {
		return totalSkills;
	}

	public void setTotalSkills(long totalSkills) {
		this.totalSkills = totalSkills;
	}

	public long getTotalProjects() {
		return totalProjects;
	}

	public void setTotalProjects(long totalProjects) {
		this.totalProjects = totalProjects;
	}

	public long getTotalCertificates() {
		return totalCertificates;
	}

	public void setTotalCertificates(long totalCertificates) {
		this.totalCertificates = totalCertificates;
	}

	public long getTotalLearningResources() {
		return totalLearningResources;
	}

	public void setTotalLearningResources(long totalLearningResources) {
		this.totalLearningResources = totalLearningResources;
	}

	public long getTotalLearningGoals() {
		return totalLearningGoals;
	}

	public void setTotalLearningGoals(long totalLearningGoals) {
		this.totalLearningGoals = totalLearningGoals;
	}

	public long getCompletedGoals() {
		return completedGoals;
	}

	public void setCompletedGoals(long completeGoals) {
		this.completedGoals = completeGoals;
	}

	public double getAverageGoalProgress() {
		return averageGoalProgress;
	}

	public void setAverageGoalProgress(double averageGoalProgress) {
		this.averageGoalProgress = averageGoalProgress;
	}

	public boolean isHasResume() {
		return hasResume;
	}

	public void setHasResume(boolean hasResume) {
		this.hasResume = hasResume;
	}
}
