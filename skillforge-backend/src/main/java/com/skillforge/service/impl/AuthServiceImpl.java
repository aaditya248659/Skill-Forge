package com.skillforge.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.skillforge.dto.LoginRequestDTO;
import com.skillforge.dto.LoginResponseDTO;
import com.skillforge.entity.User;
import com.skillforge.exception.ResourceNotFoundException;
import com.skillforge.repository.UserRepository;
import com.skillforge.security.CustomUserDetailsService;
import com.skillforge.service.AuthService;
import com.skillforge.util.JwtUtil;

@Service
public class AuthServiceImpl implements AuthService {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private CustomUserDetailsService customUserDetailsService;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public LoginResponseDTO loginUser(LoginRequestDTO loginRequestDTO) {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						loginRequestDTO.getEmail(),
						loginRequestDTO.getPassword()));
		
		UserDetails userDetails = customUserDetailsService
				.loadUserByUsername(loginRequestDTO.getEmail());
		
		String token = jwtUtil.generateToken(userDetails);
		
		User user = userRepository.findByEmail(loginRequestDTO.getEmail())
				.orElseThrow(() -> 
						new ResourceNotFoundException("User not found")); 
		
		LoginResponseDTO response = new LoginResponseDTO();
		
		response.setUserId(user.getUserId());
		response.setToken(token);
		response.setEmail(user.getEmail());
		response.setFullName(user.getFullName());
		response.setRole(user.getRole().getRoleName());
		
		return response;
	}
}
