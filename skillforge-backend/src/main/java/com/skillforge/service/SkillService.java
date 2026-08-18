package com.skillforge.service;

import java.util.List;

import com.skillforge.dto.CreateSkillRequestDTO;
import com.skillforge.dto.SkillResponseDTO;

public interface SkillService {
	
	SkillResponseDTO addSkill(CreateSkillRequestDTO request);
	
	List<SkillResponseDTO> getMySkills();
	
	SkillResponseDTO getSkillById(Long skillId);
	
	SkillResponseDTO updateSkill(Long skillId,
								CreateSkillRequestDTO request);
	
	void deleteSkill(Long skillId);
}
