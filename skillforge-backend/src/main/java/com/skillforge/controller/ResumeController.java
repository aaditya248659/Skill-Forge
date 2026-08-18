package com.skillforge.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.skillforge.dto.ResumeResponseDTO;
import com.skillforge.service.ResumeService;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    @PostMapping
    public ResponseEntity<ResumeResponseDTO> uploadResume(
            @RequestParam("resumeTitle") String resumeTitle,
            @RequestParam("file") MultipartFile file) {

        return new ResponseEntity<>(
                resumeService.uploadResume(resumeTitle, file),
                HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<ResumeResponseDTO> getMyResume() {

        return ResponseEntity.ok(
                resumeService.getMyResume());
    }
    
    @GetMapping("/view")
    public ResponseEntity<?> viewResume() {

        return resumeService.viewResume();
    }
    
    @GetMapping("/extract")
    public ResponseEntity<ResumeResponseDTO> extractResumeData() {

        return ResponseEntity.ok(
                resumeService.extractResumeData());
    }
    
    @GetMapping("/analyze")
    public ResponseEntity<ResumeResponseDTO> analyzeResume() {

        return ResponseEntity.ok(
                resumeService.extractResumeData());
    }

    @PutMapping
    public ResponseEntity<ResumeResponseDTO> updateResume(
            @RequestParam("resumeTitle") String resumeTitle,
            @RequestParam("file") MultipartFile file) {

        return ResponseEntity.ok(
                resumeService.updateResume(resumeTitle, file));
    }
    
    @PutMapping("/apply")
    public ResponseEntity<ResumeResponseDTO> applyResumeData() {

        resumeService.applyResumeData();

        return ResponseEntity.ok(
                resumeService.getMyResume());
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteResume() {

        resumeService.deleteResume();

        return ResponseEntity.noContent().build();
    }
}