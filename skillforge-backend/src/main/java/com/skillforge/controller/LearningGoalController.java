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

import com.skillforge.dto.LearningGoalRequestDTO;
import com.skillforge.dto.LearningGoalResponseDTO;
import com.skillforge.service.LearningGoalService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/learning-goals")
public class LearningGoalController {

    @Autowired
    private LearningGoalService learningGoalService;

    @PostMapping
    public ResponseEntity<LearningGoalResponseDTO> addGoal(
            @Valid @RequestBody LearningGoalRequestDTO requestDTO) {

        return new ResponseEntity<>(
                learningGoalService.addGoal(requestDTO),
                HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<LearningGoalResponseDTO>> getMyGoals() {

        return ResponseEntity.ok(
                learningGoalService.getMyGoals());
    }

    @GetMapping("/{goalId}")
    public ResponseEntity<LearningGoalResponseDTO> getGoalById(
            @PathVariable Long goalId) {

        return ResponseEntity.ok(
                learningGoalService.getGoalById(goalId));
    }

    @PutMapping("/{goalId}")
    public ResponseEntity<LearningGoalResponseDTO> updateGoal(
            @PathVariable Long goalId,
            @Valid @RequestBody LearningGoalRequestDTO requestDTO) {

        return ResponseEntity.ok(
                learningGoalService.updateGoal(goalId, requestDTO));
    }

    @DeleteMapping("/{goalId}")
    public ResponseEntity<Void> deleteGoal(
            @PathVariable Long goalId) {

        learningGoalService.deleteGoal(goalId);

        return ResponseEntity.noContent().build();
    }
}