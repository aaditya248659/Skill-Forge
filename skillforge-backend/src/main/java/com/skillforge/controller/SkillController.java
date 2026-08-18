package com.skillforge.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillforge.dto.CreateSkillRequestDTO;
import com.skillforge.dto.SkillResponseDTO;
import com.skillforge.service.SkillService;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    @Autowired
    private SkillService skillService;

    // Add Skill
    @PostMapping
    public ResponseEntity<SkillResponseDTO> addSkill(
            @RequestBody CreateSkillRequestDTO request) {

        SkillResponseDTO response = skillService.addSkill(request);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Get All Skills
    @GetMapping
    public ResponseEntity<List<SkillResponseDTO>> getMySkills() {

        List<SkillResponseDTO> response = skillService.getMySkills();

        return ResponseEntity.ok(response);
    }

    // Get Skill By ID
    @GetMapping("/{skillId}")
    public ResponseEntity<SkillResponseDTO> getSkillById(
            @PathVariable Long skillId) {

        SkillResponseDTO response = skillService.getSkillById(skillId);

        return ResponseEntity.ok(response);
    }

    // Update Skill
    @PutMapping("/{skillId}")
    public ResponseEntity<SkillResponseDTO> updateSkill(
            @PathVariable Long skillId,
            @RequestBody CreateSkillRequestDTO request) {

        SkillResponseDTO response =
                skillService.updateSkill(skillId, request);

        return ResponseEntity.ok(response);
    }

    // Delete Skill
    @DeleteMapping("/{skillId}")
    public ResponseEntity<String> deleteSkill(
            @PathVariable Long skillId) {

        skillService.deleteSkill(skillId);

        return ResponseEntity.ok("Skill deleted successfully.");
    }
}