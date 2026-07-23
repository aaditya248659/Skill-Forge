package com.skillforge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillforge.entity.Profile;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
}