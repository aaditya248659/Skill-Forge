package com.skillforge.dto;

import com.skillforge.enums.SkillLevel;

public class CreateSkillRequestDTO {
	
	private String skillName;
	
	private String category;
	
	private SkillLevel skillLevel;
	
	private String description;
	
	public CreateSkillRequestDTO() {
	}

	public CreateSkillRequestDTO(String skillName, String category, SkillLevel skillLevel, String description) {
		super();
		this.skillName = skillName;
		this.category = category;
		this.skillLevel = skillLevel;
		this.description = description;
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
}
