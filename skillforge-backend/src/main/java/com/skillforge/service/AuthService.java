package com.skillforge.service;

import com.skillforge.dto.LoginRequestDTO;
import com.skillforge.dto.LoginResponseDTO;

public interface AuthService {
	LoginResponseDTO loginUser(LoginRequestDTO loginRequestDTO);
}
