package com.skillforge.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.skillforge.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		com.skillforge.entity.User user = userRepository
				.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));
		return User.builder()
				.username(user.getEmail())
				.password(user.getPassword())
				.roles(user.getRole().getRoleName())
				.build();
	}
	
}
