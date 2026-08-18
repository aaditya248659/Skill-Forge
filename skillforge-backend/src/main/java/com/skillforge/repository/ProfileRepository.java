package com.skillforge.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillforge.entity.Profile;
import com.skillforge.entity.User;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
	
	Optional<Profile> findByUser(User user);
	
	boolean existsByUser(User user);
}