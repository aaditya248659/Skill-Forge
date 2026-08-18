package com.skillforge.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillforge.entity.User;
import com.skillforge.enums.AccountStatus;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByEmail(String email);
	boolean existsByEmail(String email);
	
	List<User> findByRoleRoleNameNot(String roleName);
	
	long countByRoleRoleNameNot(String roleName);
	
	long countByAccountStatusAndRoleRoleNameNot(
			AccountStatus accountStatus, String roleName);
}
