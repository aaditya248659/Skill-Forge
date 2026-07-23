package com.skillforge.entity;

import java.time.LocalDate;

import com.skillforge.enums.GoalStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "learning_goals")
public class LearningGoal {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "goal_id")
	private Long goalId;
	
	@Column(name = "goal_title", nullable = false, length = 150)
	private String goalTitle;
	
	@Column(name = "description", length = 500)
	private String description;
	
	@Column(name = "target_date")
	private LocalDate targetDate;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "status", nullable = false)
	private GoalStatus status;
	
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	public LearningGoal() {
	}

	public LearningGoal(String goalTitle, 
			String description, 
			LocalDate targetDate, 
			GoalStatus status,
			User user) {
		this.goalTitle = goalTitle;
		this.description = description;
		this.targetDate = targetDate;
		this.status = status;
		this.user = user;
	}

	public Long getGoalId() {
		return goalId;
	}

	public void setGoalId(Long goalId) {
		this.goalId = goalId;
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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}
