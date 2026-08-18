package com.skillforge.service;

import java.util.List;

import com.skillforge.dto.CertificateRequestDTO;
import com.skillforge.dto.CertificateResponseDTO;

public interface CertificateService {
	
	CertificateResponseDTO addCertificate(CertificateRequestDTO requestDTO);
	
	List<CertificateResponseDTO> getMyCertificates();
	
	CertificateResponseDTO getCertificateById(Long certificateId);
	
	CertificateResponseDTO updateCertificate(
			Long certificateId,
			CertificateRequestDTO requestDTO);
	
	void deleteCertificate(Long certificateID);
}
