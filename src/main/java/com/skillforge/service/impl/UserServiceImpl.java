package com.skillforge.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.skillforge.dto.RegisterRequestDTO;
import com.skillforge.dto.UserResponseDTO;
import com.skillforge.entity.Role;
import com.skillforge.entity.User;
import com.skillforge.enums.AccountStatus;
import com.skillforge.repository.RoleRepository;
import com.skillforge.repository.UserRepository;
import com.skillforge.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public UserResponseDTO registerUser(RegisterRequestDTO registerRequestDTO) {

		// Check duplicate email
		if (userRepository.existsByEmail(registerRequestDTO.getEmail())) {
			throw new RuntimeException("Email already exists.");
		}

		// Create User object
		User user = new User();

		// Copy DTO values
		user.setFullName(registerRequestDTO.getFullName());
		user.setEmail(registerRequestDTO.getEmail());

		// Encrypt password
		user.setPassword(passwordEncoder.encode(registerRequestDTO.getPassword()));

		// Assign default USER role
		Role role = roleRepository.findByRoleName("USER")
				.orElseThrow(() -> new RuntimeException("Default role not found."));

		user.setRole(role);

		// Profile Type selected by user
		user.setProfileType(registerRequestDTO.getProfileType());

		// Default account status
		user.setAccountStatus(AccountStatus.ACTIVE);

		// Save user
		User savedUser = userRepository.save(user);

		// Prepare response DTO
		UserResponseDTO response = new UserResponseDTO();

		response.setId(savedUser.getUserId());
		response.setFullName(savedUser.getFullName());
		response.setEmail(savedUser.getEmail());
		response.setRole(savedUser.getRole().getRoleName());

		return response;
	}
}