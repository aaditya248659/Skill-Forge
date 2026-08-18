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

import com.skillforge.dto.LearningResourceRequestDTO;
import com.skillforge.dto.LearningResourceResponseDTO;
import com.skillforge.service.LearningResourceService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/learning-resources")
public class LearningResourceController {

    @Autowired
    private LearningResourceService learningResourceService;

    @PostMapping
    public ResponseEntity<LearningResourceResponseDTO> addResource(
            @Valid @RequestBody LearningResourceRequestDTO requestDTO) {

        return new ResponseEntity<>(
                learningResourceService.addResource(requestDTO),
                HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<LearningResourceResponseDTO>> getMyResources() {

        return ResponseEntity.ok(
                learningResourceService.getMyResources());
    }

    @GetMapping("/{resourceId}")
    public ResponseEntity<LearningResourceResponseDTO> getResourceById(
            @PathVariable Long resourceId) {

        return ResponseEntity.ok(
                learningResourceService.getResourceById(resourceId));
    }

    @PutMapping("/{resourceId}")
    public ResponseEntity<LearningResourceResponseDTO> updateResource(
            @PathVariable Long resourceId,
            @Valid @RequestBody LearningResourceRequestDTO requestDTO) {

        return ResponseEntity.ok(
                learningResourceService.updateResource(resourceId, requestDTO));
    }

    @DeleteMapping("/{resourceId}")
    public ResponseEntity<Void> deleteResource(
            @PathVariable Long resourceId) {

        learningResourceService.deleteResource(resourceId);

        return ResponseEntity.noContent().build();
    }
}