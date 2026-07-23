package com.skillforge.entity;

import java.time.LocalDate;

import com.skillforge.enums.Gender;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "profiles")
public class Profile {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "profile_id")
	private Long profileId;
	
	@OneToOne
	@JoinColumn(name = "user_id", nullable = false, unique = true)
	private User user;
	
	@Column(name = "phone", length = 15)
	private String phone;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "gender")
	private Gender gender;
	
	@Column(name = "date_of_birth")
	private LocalDate dateOfBirth;
	
	@Column(name = "address", length = 255)
	private String address;
	
	@Column(name = "bio", length = 500)
	private String bio;
	
	@Column(name = "profile_picture", length = 255)
	private String profilePicture;
	
	@Column(name = "college_name", length = 100)
	private String collegeName;
	
	@Column(name = "university", length = 100)
	private String university;
	
	@Column(name = "degree", length = 100)
	private String degree;
	
	@Column(name = "branch", length = 100)
	private String branch;
	
	@Column(name = "cgpa")
	private Double cgpa;
	
	@Column(name = "graduation_year")
	private Integer graduationYear;
	
	@Column(name = "company_name", length = 100)
    private String companyName;

    @Column(name = "designation", length = 100)
    private String designation;

    @Column(name = "experience_years")
    private Integer experienceYears;

    @Column(name = "linkedin", length = 255)
    private String linkedin;

    @Column(name = "github", length = 255)
    private String github;
    
    public Profile() {
    }

    public Profile(User user, String phone, Gender gender,
                   LocalDate dateOfBirth, String address,
                   String bio, String profilePicture,
                   String collegeName, String university,
                   String degree, String branch,
                   Double cgpa, Integer graduationYear,
                   String companyName, String designation,
                   Integer experienceYears,
                   String linkedin, String github) {

        this.user = user;
        this.phone = phone;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
        this.bio = bio;
        this.profilePicture = profilePicture;
        this.collegeName = collegeName;
        this.university = university;
        this.degree = degree;
        this.branch = branch;
        this.cgpa = cgpa;
        this.graduationYear = graduationYear;
        this.companyName = companyName;
        this.designation = designation;
        this.experienceYears = experienceYears;
        this.linkedin = linkedin;
        this.github = github;
    }

	public Long getProfileId() {
		return profileId;
	}

	public void setProfileId(Long profileId) {
		this.profileId = profileId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public LocalDate getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(LocalDate dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}

	public String getProfilePicture() {
		return profilePicture;
	}

	public void setProfilePicture(String profilePicture) {
		this.profilePicture = profilePicture;
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

	public Double getCgpa() {
		return cgpa;
	}

	public void setCgpa(Double cgpa) {
		this.cgpa = cgpa;
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

	public Integer getExperienceYears() {
		return experienceYears;
	}

	public void setExperienceYears(Integer experienceYears) {
		this.experienceYears = experienceYears;
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
