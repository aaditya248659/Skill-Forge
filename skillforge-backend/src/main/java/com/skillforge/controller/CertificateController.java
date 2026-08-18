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

import com.skillforge.dto.CertificateRequestDTO;
import com.skillforge.dto.CertificateResponseDTO;
import com.skillforge.service.CertificateService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/certificates")
public class CertificateController {

    @Autowired
    private CertificateService certificateService;

    @PostMapping
    public ResponseEntity<CertificateResponseDTO> addCertificate(
            @Valid @RequestBody CertificateRequestDTO requestDTO) {

        CertificateResponseDTO response =
                certificateService.addCertificate(requestDTO);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CertificateResponseDTO>> getMyCertificates() {

        return ResponseEntity.ok(certificateService.getMyCertificates());
    }

    @GetMapping("/{certificateId}")
    public ResponseEntity<CertificateResponseDTO> getCertificateById(
            @PathVariable Long certificateId) {

        return ResponseEntity.ok(
                certificateService.getCertificateById(certificateId));
    }

    @PutMapping("/{certificateId}")
    public ResponseEntity<CertificateResponseDTO> updateCertificate(
            @PathVariable Long certificateId,
            @Valid @RequestBody CertificateRequestDTO requestDTO) {

        return ResponseEntity.ok(
                certificateService.updateCertificate(certificateId, requestDTO));
    }

    @DeleteMapping("/{certificateId}")
    public ResponseEntity<Void> deleteCertificate(
            @PathVariable Long certificateId) {

        certificateService.deleteCertificate(certificateId);

        return ResponseEntity.noContent().build();
    }
}