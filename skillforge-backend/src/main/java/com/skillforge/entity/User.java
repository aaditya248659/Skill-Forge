package com.skillforge.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.skillforge.enums.AccountStatus;
import com.skillforge.enums.ProfileType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private Long userId;
	
	@Column(name = "full_name", nullable = false, length = 100)
	private String fullName;
	
	@Column(name = "email", nullable = false, unique = true, length = 100)
	private String email;
	
	@Column(name = "password", nullable = false)
	private String password;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "profile_type", nullable = false)
	private ProfileType profileType;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "account_status", nullable = false)
	private AccountStatus accountStatus;
	
	@ManyToOne
	@JoinColumn(name = "role_id", nullable = false)
	private Role role;
	
	@OneToOne(mappedBy = "user")
	@JsonIgnore
	private Profile profile;
	
	@OneToMany(mappedBy = "user")
	@JsonIgnore
	private List<Skill> skills;
	
	@OneToMany(mappedBy = "user")
	@JsonIgnore
	private List<Project> projects;
	
	@OneToMany(mappedBy = "user")
	@JsonIgnore
	private List<Certificate> certificates;
	
	@OneToMany(mappedBy = "user")
	@JsonIgnore
	private List<LearningGoal> learningGoals;
	
	@OneToMany(mappedBy = "user")
	@JsonIgnore
	private List<LearningResource> learningResources;
	
	@OneToOne(mappedBy = "user")
	@JsonIgnore
	private Resume resume;
	public User() {
	}
	
	public User(String fullName, String email, String password,
			ProfileType profileType,
			AccountStatus accountStatus,
			Role role) {
		this.fullName = fullName;
		this.email = email;
		this.password = password;
		this.profileType = profileType;
		this.accountStatus = accountStatus;
		this.role = role;
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
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public ProfileType getProfileType() {
		return profileType;
	}
	
	public void setProfileType(ProfileType profileType) {
		this.profileType = profileType;
	}
	
	public AccountStatus getAccountStatus() {
		return accountStatus;
	}
	
	public void setAccountStatus(AccountStatus accountStatus) {
		this.accountStatus = accountStatus;
	}
	
	public Role getRole() {
		return role;
	}
	
	public void setRole(Role role) {
		this.role = role;
	}

	public Profile getProfile() {
		return profile;
	}

	public void setProfile(Profile profile) {
		this.profile = profile;
	}

	public List<Skill> getSkills() {
		return skills;
	}

	public void setSkills(List<Skill> skills) {
		this.skills = skills;
	}

	public List<Project> getProjects() {
		return projects;
	}

	public void setProjects(List<Project> projects) {
		this.projects = projects;
	}

	public List<Certificate> getCertificates() {
		return certificates;
	}

	public void setCertificates(List<Certificate> certificates) {
		this.certificates = certificates;
	}

	public List<LearningGoal> getLearningGoals() {
		return learningGoals;
	}

	public void setLearningGoals(List<LearningGoal> learningGoals) {
		this.learningGoals = learningGoals;
	}

	public List<LearningResource> getLearningResources() {
		return learningResources;
	}

	public void setLearningResources(List<LearningResource> learningResources) {
		this.learningResources = learningResources;
	}

	public Resume getResume() {
		return resume;
	}

	public void setResume(Resume resume) {
		this.resume = resume;
	}
}