package com.skillforge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillforge.entity.Skill;
import com.skillforge.entity.User;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
	
	List<Skill> findByUser(User user);
	
	boolean existsByUserAndSkillNameIgnoreCase(User user, String skillname);
	
	void deleteByUser(User user);
}
