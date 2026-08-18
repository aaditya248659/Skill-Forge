package com.skillforge.service;

import com.skillforge.dto.RegisterRequestDTO;
import com.skillforge.dto.UserResponseDTO;

public interface UserService {
	UserResponseDTO registerUser(RegisterRequestDTO registerRequestDTO);
	
}
