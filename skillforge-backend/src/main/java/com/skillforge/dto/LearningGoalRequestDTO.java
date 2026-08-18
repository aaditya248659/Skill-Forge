package com.skillforge.dto;

import java.time.LocalDate;

import com.skillforge.enums.GoalStatus;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class LearningGoalRequestDTO {
	
	@NotBlank(message = "Goal title is required")
	private String goalTitle;
	
	private String description;
	
	private LocalDate targetDate;
	
	@NotNull(message = "Goal status is required")
	private GoalStatus status;
	
	@NotNull(message = "Progress is required")
	@Min(value = 0, message = "Progress cannot be less than 0")
	@Max(value = 100, message = "Progress cannot be greater than 100")
	private Integer progress;

	public LearningGoalRequestDTO() {
	}

	public String getGoalTitle() {
		return goalTitle;
	}

	public void setGoalTitle(String goalTitle) {
		this.goalTitle = goalTitle;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDate getTargetDate() {
		return targetDate;
	}

	public void setTargetDate(LocalDate targetDate) {
		this.targetDate = targetDate;
	}

	public GoalStatus getStatus() {
		return status;
	}

	public void setStatus(GoalStatus status) {
		this.status = status;
	}

	public Integer getProgress() {
		return progress;
	}

	public void setProgress(Integer progress) {
		this.progress = progress;
	}
}
