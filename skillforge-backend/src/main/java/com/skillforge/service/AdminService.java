package com.skillforge.service;

import java.util.List;

import com.skillforge.dto.AdminDashboard;
import com.skillforge.dto.AdminUserResponseDTO;
import com.skillforge.dto.UpdateAccountStatusRequestDTO;

public interface AdminService {
	
	List<AdminUserResponseDTO> getAllUsers();
	
	AdminUserResponseDTO getUserById(Long userId);
	
	AdminUserResponseDTO updateUserStatus(
			Long userId,
			UpdateAccountStatusRequestDTO requestDTO);
	
	void deleteUser(Long userId);
	
	AdminDashboard getDashboard();
}
