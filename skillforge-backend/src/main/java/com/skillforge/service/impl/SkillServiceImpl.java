package com.skillforge.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.skillforge.dto.CreateSkillRequestDTO;
import com.skillforge.dto.SkillResponseDTO;
import com.skillforge.entity.Skill;
import com.skillforge.entity.User;
import com.skillforge.exception.ResourceNotFoundException;
import com.skillforge.repository.SkillRepository;
import com.skillforge.repository.UserRepository;
import com.skillforge.service.SkillService;

@Service
public class SkillServiceImpl implements SkillService{
	
	@Autowired
	private SkillRepository skillRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public SkillResponseDTO addSkill(CreateSkillRequestDTO request) {
		
		User user = getLoggedInUser();
		
		Skill skill = new Skill();
		
		skill.setSkillName(request.getSkillName());
		skill.setCategory(request.getCategory());
		skill.setSkillLevel(request.getSkillLevel());
		skill.setDescription(request.getDescription());
		skill.setUser(user);
		
		Skill savedSkill = skillRepository.save(skill);
		
		return convertToResponse(savedSkill);
	}
	
	@Override
	public List<SkillResponseDTO> getMySkills() {
		
		User user = getLoggedInUser();
		
		return skillRepository.findByUser(user)
				.stream()
				.map(this::convertToResponse)
				.collect(Collectors.toList());
	}
	
	@Override
	public SkillResponseDTO getSkillById(Long skillId) {
		
		User user = getLoggedInUser();
		
		Skill skill = skillRepository.findById(skillId)
				.orElseThrow(() -> 
						new ResourceNotFoundException("Skill not found"));
		
		if (!skill.getUser().getUserId().equals(user.getUserId())) {
			throw new ResourceNotFoundException("Skill not found");
		}
		
		return convertToResponse(skill);
	}
	
	@Override
	public SkillResponseDTO updateSkill(Long skillId,
										CreateSkillRequestDTO request) {
		
		User user = getLoggedInUser();
		
		Skill skill = skillRepository.findById(skillId)
				.orElseThrow(() ->
						new ResourceNotFoundException("Skill not found"));
		
		if (!skill.getUser().getUserId().equals(user.getUserId())) {
			throw new ResourceNotFoundException("Skill not found");
		}
		
		skill.setSkillName(request.getSkillName());
		skill.setCategory(request.getCategory());
		skill.setSkillLevel(request.getSkillLevel());
		skill.setDescription(request.getDescription());
		
		Skill updatedSkill = skillRepository.save(skill);
		
		return convertToResponse(updatedSkill);
	}
	
	@Override
	public void deleteSkill(Long skillId) {
		User user = getLoggedInUser();
		
		Skill skill = skillRepository.findById(skillId)
				.orElseThrow(() -> 
						new ResourceNotFoundException("Skill not found"));
		
		if (!skill.getUser().getUserId().equals(user.getUserId())) {
			throw new ResourceNotFoundException("Skill not found");
		}
		
		skillRepository.delete(skill);
	}
	
	private User getLoggedInUser() {
		
		Authentication authentication = 
				SecurityContextHolder.getContext().getAuthentication();
		
		String email = authentication.getName();
		
		return userRepository.findByEmail(email)
				.orElseThrow(() ->
						new ResourceNotFoundException("User not found"));
	}
	
	private SkillResponseDTO convertToResponse(Skill skill) {
		
		SkillResponseDTO response = new SkillResponseDTO();
		
		response.setSkillId(skill.getSkillId());
		response.setUserId(skill.getUser().getUserId());
		response.setFullname(skill.getUser().getFullName());
		response.setSkillName(skill.getSkillName());
		response.setCategory(skill.getCategory());
		response.setSkillLevel(skill.getSkillLevel());
		response.setDescription(skill.getDescription());
		
		return response;
	}
}
