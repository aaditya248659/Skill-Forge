package com.skillforge.service;

import com.skillforge.dto.CreateProfileRequestDTO;
import com.skillforge.dto.ProfileResponseDTO;

public interface ProfileService {
	
	ProfileResponseDTO createProfile(CreateProfileRequestDTO request);
	
	ProfileResponseDTO getMyProfile();
	
	ProfileResponseDTO updateProfile(CreateProfileRequestDTO request);
	
	void deleteProfile();
}
