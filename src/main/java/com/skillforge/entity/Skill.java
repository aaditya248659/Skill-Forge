package com.skillforge.entity;

import com.skillforge.enums.SkillLevel;

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
@Table(name = "skills")
public class Skill {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "skill_id")
	private Long skillId;
	
	@Column(name = "skill_name", nullable = false, length = 100)
	private String skillName;
	
	@Column(name = "category", nullable = false, length = 100)
	private String category;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "skill_level", nullable = false)
	private SkillLevel skillLevel;
	
	@Column(name = "description", length = 500)
	private String description;
	
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;
	
	public Skill() {
	}
	
	public Skill(String skillName, String category,
			SkillLevel skillLevel,
			String description,
			User user) {
		this.skillName = skillName;
		this.category = category;
		this.skillLevel = skillLevel;
		this.description = description;
		this.user = user;
	}
	
	public Long getSkillId() {
		return skillId;
	}
	
	public void setSkillId(Long skillId) {
		this.skillId = skillId;
	}
	
	public String getSkillName() {
		return skillName;
	}
	
	public void setSkillName(String skillName) {
		this.skillName = skillName;
	}
	
	public String getCategory() {
		return category;
	}
	
	public void setCategory(String category) {
		this.category = category;
	}
	
	public SkillLevel getSkillLevel() {
		return skillLevel;
	}
	
	public void setSkillLevel(SkillLevel skillLevel) {
		this.skillLevel = skillLevel;
	}
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public User getUser() {
		return user;
	}
	
	public void setUser(User user) {
		this.user = user;
	}
}