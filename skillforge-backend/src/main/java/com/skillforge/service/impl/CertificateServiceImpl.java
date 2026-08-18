package com.skillforge.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.skillforge.dto.CertificateRequestDTO;
import com.skillforge.dto.CertificateResponseDTO;
import com.skillforge.entity.Certificate;
import com.skillforge.entity.User;
import com.skillforge.exception.ResourceNotFoundException;
import com.skillforge.repository.CertificateRepository;
import com.skillforge.repository.UserRepository;
import com.skillforge.service.CertificateService;

@Service
public class CertificateServiceImpl implements CertificateService {
	
	@Autowired
	private CertificateRepository certificateRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public CertificateResponseDTO addCertificate(CertificateRequestDTO requestDTO) {
		
		User user = getLoggedInUser();
		
		Certificate certificate = new Certificate();
		
		certificate.setCertificateName(requestDTO.getCertificateName());
		certificate.setIssuingOrganization(requestDTO.getIssuingOrganization());
		certificate.setIssueDate(requestDTO.getIssueDate());
		certificate.setExpiryDate(requestDTO.getExpiryDate());
		certificate.setCertificateLink(requestDTO.getCertificateLink());
		certificate.setUser(user);
		
		Certificate savedCertificate = certificateRepository.save(certificate);
		
		return convertToResponse(savedCertificate);
	}
	
	@Override
	public List<CertificateResponseDTO> getMyCertificates() {
		
		User user = getLoggedInUser();
		
		return certificateRepository.findByUserUserId(user.getUserId())
				.stream()
				.map(this::convertToResponse)
				.collect(Collectors.toList());
	}
	
	@Override
	public CertificateResponseDTO getCertificateById(Long certificateId) {
		
		User user = getLoggedInUser();
		
		Certificate certificate = certificateRepository.findById(certificateId)
				.orElseThrow(() ->
						new ResourceNotFoundException("Certificate not found"));
		
		if (!certificate.getUser().getUserId().equals(user.getUserId())) {
			throw new ResourceNotFoundException("Certificate not found");
		}
		
		return convertToResponse(certificate);
	}
	
	@Override
	public CertificateResponseDTO updateCertificate(
			Long certificateId,
			CertificateRequestDTO requestDTO) {
		
		User user = getLoggedInUser();
		
		Certificate certificate = certificateRepository.findById(certificateId)
				.orElseThrow(() ->
						new ResourceNotFoundException("Certificate not found"));
		
		if (!certificate.getUser().getUserId().equals(user.getUserId())) {
			throw new ResourceNotFoundException("Certificate not found");
		}
		
		certificate.setCertificateName(requestDTO.getCertificateName());
		certificate.setIssuingOrganization(requestDTO.getIssuingOrganization());
		certificate.setIssueDate(requestDTO.getIssueDate());
		certificate.setExpiryDate(requestDTO.getExpiryDate());
		certificate.setCertificateLink(requestDTO.getCertificateLink());
		
		Certificate updatedCertificate = certificateRepository.save(certificate);
		
		return convertToResponse(updatedCertificate);
	}
	
	@Override
	public void deleteCertificate(Long certificateId) {
		
		User user = getLoggedInUser();
		
		Certificate certificate = certificateRepository.findById(certificateId)
				.orElseThrow(() ->
						new ResourceNotFoundException("Certificate not found"));
		
		if (!certificate.getUser().getUserId().equals(user.getUserId())) {
			throw new ResourceNotFoundException("Certificate not found");
		}
		
		certificateRepository.delete(certificate);
	}
	
	private User getLoggedInUser() {
		Authentication authentication =
				SecurityContextHolder.getContext().getAuthentication();
		
		String email = authentication.getName();
		
		return userRepository.findByEmail(email)
				.orElseThrow(() ->
						new ResourceNotFoundException("User not found"));
	}
	
	private CertificateResponseDTO convertToResponse(Certificate certificate) {
		
		CertificateResponseDTO response = new CertificateResponseDTO();
		
		response.setCertificateId(certificate.getCertificateId());
		response.setUserId(certificate.getUser().getUserId());
		response.setFullName(certificate.getUser().getFullName());
		response.setCertificateName(certificate.getCertificateName());
		response.setIssuingOrganization(certificate.getIssuingOrganization());
		response.setIssueDate(certificate.getIssueDate());
		response.setExpiryDate(certificate.getExpiryDate());
		response.setCertificateLink(certificate.getCertificateLink());
		
		return response;
	}
}
