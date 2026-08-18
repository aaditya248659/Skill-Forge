package com.skillforge.dto;

import java.time.LocalDateTime;
import java.util.List;

public class ResumeResponseDTO {
	
	private Long resumeId;
	private Long userId;
	private String fullName;
	private String resumeTitle;
	private String resumeFile;
	private LocalDateTime createdAt;
	
	private String email;
    private String phone;
    private String degree;
    private String branch;
    private String collegeName;
    private String university;
    private Integer graduationYear;
    private String companyName;
    private String designation;
    private Double experienceYears;
    private String bio;
    
    private List<String> skills;
    
    private List<CertificateDTO> certificates;
    
    private List<String> recommendedSkills;
    
    private List<String> careerSuggestions;
    
    private String address;
    private String linkedin;
    private String github;
    
    
    
	public ResumeResponseDTO() {
	}

	public Long getResumeId() {
		return resumeId;
	}

	public void setResumeId(Long resumeId) {
		this.resumeId = resumeId;
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

	public String getResumeTitle() {
		return resumeTitle;
	}

	public void setResumeTitle(String resumeTitle) {
		this.resumeTitle = resumeTitle;
	}

	public String getResumeFile() {
		return resumeFile;
	}

	public void setResumeFile(String resumeFile) {
		this.resumeFile = resumeFile;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getDegree() {
		return degree;
	}

	public void setDegree(String degree) {
		this.degree = degree;
	}

	public String getBranch() {
		return branch;
	}

	public void setBranch(String branch) {
		this.branch = branch;
	}

	public String getCollegeName() {
		return collegeName;
	}

	public void setCollegeName(String collegeName) {
		this.collegeName = collegeName;
	}

	public String getUniversity() {
		return university;
	}

	public void setUniversity(String university) {
		this.university = university;
	}

	public Integer getGraduationYear() {
		return graduationYear;
	}

	public void setGraduationYear(Integer graduationYear) {
		this.graduationYear = graduationYear;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public Double getExperienceYears() {
		return experienceYears;
	}

	public void setExperienceYears(Double experienceYears) {
		this.experienceYears = experienceYears;
	}

	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}

	public List<String> getSkills() {
		return skills;
	}

	public void setSkills(List<String> skills) {
		this.skills = skills;
	}
	
	public List<CertificateDTO> getCertificates() {
	    return certificates;
	}

	public void setCertificates(List<CertificateDTO> certificates) {
	    this.certificates = certificates;
	}

	public List<String> getRecommendedSkills() {
	    return recommendedSkills;
	}

	public void setRecommendedSkills(List<String> recommendedSkills) {
	    this.recommendedSkills = recommendedSkills;
	}

	public List<String> getCareerSuggestions() {
	    return careerSuggestions;
	}

	public void setCareerSuggestions(List<String> careerSuggestions) {
	    this.careerSuggestions = careerSuggestions;
	}

	public String getAddress() {
	    return address;
	}

	public void setAddress(String address) {
	    this.address = address;
	}

	public String getLinkedin() {
	    return linkedin;
	}

	public void setLinkedin(String linkedin) {
	    this.linkedin = linkedin;
	}

	public String getGithub() {
	    return github;
	}

	public void setGithub(String github) {
	    this.github = github;
	}
}
