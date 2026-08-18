package com.skillforge.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillforge.dto.LoginRequestDTO;
import com.skillforge.dto.LoginResponseDTO;
import com.skillforge.dto.RegisterRequestDTO;
import com.skillforge.dto.UserResponseDTO;
import com.skillforge.service.AuthService;
import com.skillforge.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")

public class AuthController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private AuthService authService;
	
	@PostMapping("/register")
	public ResponseEntity<UserResponseDTO> registerUser(
			@RequestBody RegisterRequestDTO registerRequestDTO) {
		UserResponseDTO response = 
				userService.registerUser(registerRequestDTO);
		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}
	
	@PostMapping("/login")
	public ResponseEntity<LoginResponseDTO> loginUser (
			@RequestBody LoginRequestDTO loginRequestDTO) {
		
		LoginResponseDTO response = authService.loginUser(loginRequestDTO);
		
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/test")
	public ResponseEntity<String> test() {
		return ResponseEntity.ok("JWT Authentication Successful");
	}
}
