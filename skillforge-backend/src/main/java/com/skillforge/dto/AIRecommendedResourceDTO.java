package com.skillforge.dto;

import com.skillforge.enums.ResourceType;

public class AIRecommendedResourceDTO {
	
	private String title;
	private ResourceType resourceType;
	private String resourceLink;
	private String description;
	
	public AIRecommendedResourceDTO() {
	}

	public AIRecommendedResourceDTO(String title, ResourceType resourceType, String resourceLink, String description) {
		super();
		this.title = title;
		this.resourceType = resourceType;
		this.resourceLink = resourceLink;
		this.description = description;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public ResourceType getResourceType() {
		return resourceType;
	}

	public void setResourceType(ResourceType resourceType) {
		this.resourceType = resourceType;
	}

	public String getResourceLink() {
		return resourceLink;
	}

	public void setResourceLink(String resourceLink) {
		this.resourceLink = resourceLink;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
