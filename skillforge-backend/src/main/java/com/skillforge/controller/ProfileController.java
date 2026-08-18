package com.skillforge.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillforge.dto.CreateProfileRequestDTO;
import com.skillforge.dto.ProfileResponseDTO;
import com.skillforge.service.ProfileService;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {
	
	@Autowired
	private ProfileService profileService;
	
	//Create Profile
	@PostMapping
	public ResponseEntity<ProfileResponseDTO> createProfile(
			@RequestBody CreateProfileRequestDTO request) {
		
		ProfileResponseDTO response = profileService.createProfile(request);
		
		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}
	
	//Get Logged-in User Profile
	@GetMapping("/me")
	public ResponseEntity<ProfileResponseDTO> getMyProfile() {
		
		ProfileResponseDTO response = profileService.getMyProfile();
		
		if (response == null) {
			return ResponseEntity.noContent().build();
		}
		
		return ResponseEntity.ok(response);
	}
	
	//Update Profile
	@PutMapping
	public ResponseEntity<ProfileResponseDTO> updateProfile(
			@RequestBody CreateProfileRequestDTO request) {
		
		ProfileResponseDTO response = profileService.updateProfile(request);
		
		return ResponseEntity.ok(response);
	}
	
	@DeleteMapping
	public ResponseEntity<String> deleteProfile() {

	    profileService.deleteProfile();

	    return ResponseEntity.ok(
	            "Profile deleted successfully.");
	}
}