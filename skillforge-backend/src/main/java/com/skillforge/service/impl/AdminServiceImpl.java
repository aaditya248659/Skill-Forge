package com.skillforge.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.skillforge.dto.AdminDashboard;
import com.skillforge.dto.AdminUserResponseDTO;
import com.skillforge.dto.UpdateAccountStatusRequestDTO;
import com.skillforge.entity.User;
import com.skillforge.enums.AccountStatus;
import com.skillforge.repository.UserRepository;
import com.skillforge.service.AdminService;

@Service 
public class AdminServiceImpl implements AdminService {

    private static final String ADMIN_ROLE = "ADMIN";

    private final UserRepository userRepository;

    public AdminServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<AdminUserResponseDTO> getAllUsers() {

        return userRepository.findByRoleRoleNameNot(ADMIN_ROLE)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Override
    public AdminUserResponseDTO getUserById(Long userId) {

        User user = getManageableUser(userId);

        return mapToDTO(user);
    }

    @Override
    public AdminUserResponseDTO updateUserStatus(
            Long userId,
            UpdateAccountStatusRequestDTO requestDTO) {

        User user = getManageableUser(userId);

        if (requestDTO.getAccountStatus() == null) {
            throw new RuntimeException("Account status is required");
        }

        user.setAccountStatus(requestDTO.getAccountStatus());

        User updatedUser = userRepository.save(user);

        return mapToDTO(updatedUser);
    }

    @Override
    public void deleteUser(Long userId) {

        User user = getManageableUser(userId);

        userRepository.delete(user);
    }

    @Override
    public AdminDashboard getDashboard() {

        long totalUsers =
                userRepository.countByRoleRoleNameNot(ADMIN_ROLE);

        long activeUsers =
                userRepository.countByAccountStatusAndRoleRoleNameNot(
                        AccountStatus.ACTIVE,
                        ADMIN_ROLE);

        long inactiveUsers =
                userRepository.countByAccountStatusAndRoleRoleNameNot(
                        AccountStatus.INACTIVE,
                        ADMIN_ROLE);

        long blockedUsers =
                userRepository.countByAccountStatusAndRoleRoleNameNot(
                        AccountStatus.BLOCKED,
                        ADMIN_ROLE);

        return new AdminDashboard(
                totalUsers,
                activeUsers,
                inactiveUsers,
                blockedUsers);
    }

    private User getManageableUser(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (ADMIN_ROLE.equals(user.getRole().getRoleName())) {
            throw new RuntimeException(
                    "Admin account cannot be managed");
        }

        return user;
    }

    private AdminUserResponseDTO mapToDTO(User user) {

        AdminUserResponseDTO dto = new AdminUserResponseDTO();

        dto.setUserId(user.getUserId());
        dto.setFullName(user.getFullName());
        dto.setEmail(user.getEmail());
        dto.setProfileType(user.getProfileType());
        dto.setAccountStatus(user.getAccountStatus());
        dto.setRoleName(user.getRole().getRoleName());

        return dto;
    }
}