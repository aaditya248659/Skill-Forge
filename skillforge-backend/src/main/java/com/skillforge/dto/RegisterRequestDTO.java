package com.skillforge.dto;

import com.skillforge.enums.ProfileType;

public class RegisterRequestDTO {

	private String fullName;
	private String email;
	private String password;
	private ProfileType profileType;

	public RegisterRequestDTO() {
		super();
	}

	public RegisterRequestDTO(String fullName, String email, String password, ProfileType profileType) {
		super();
		this.fullName = fullName;
		this.email = email;
		this.password = password;
		this.profileType = profileType;
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
}