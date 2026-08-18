package com.skillforge.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "certificates")
public class Certificate {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "certificate_id")
	private Long certificateId;
	
	@Column(name = "certificate_name", nullable = false, length = 150)
	private String certificateName;
	
	@Column(name = "issuing_organization", length = 150)
	private String issuingOrganization;
	
	@Column(name = "issue_date")
	private LocalDate issueDate;
	
	@Column(name = "expiry_date")
	private LocalDate expiryDate;
	
	@Column(name = "certificate_link", length = 255)
	private String certificateLink;
	
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;
	
	public Certificate() {
	}
	
	public Certificate(String certificateName,
			String issuingOrganization,
			LocalDate issueDate,
			LocalDate expiryDate,
			String certificateLink,
			User user) {
		this.certificateName = certificateName;
		this.issuingOrganization = issuingOrganization;
		this.issueDate = issueDate;
		this.expiryDate = expiryDate;
		this.certificateLink = certificateLink;
		this.user = user;
	}
	
	public Long getCertificateId() {
		return certificateId;
	}
	
	public void setCertificateId(Long certificateId) {
		this.certificateId = certificateId;
	}
	
	public String getCertificateName() {
		return certificateName;
	}
	
	public void setCertificateName(String certificateName) {
		this.certificateName = certificateName;
	}
	
	public String getIssuingOrganization() {
		return issuingOrganization;
	}
	
	public void setIssuingOrganization(String issuingOrganization) {
		this.issuingOrganization = issuingOrganization;
	}
	
	public LocalDate getIssueDate() {
		return issueDate;
	}
	
	public void setIssueDate(LocalDate issueDate) {
		this.issueDate = issueDate;
	}
	
	public LocalDate getExpiryDate() {
		return expiryDate;
	}
	
	public void setExpiryDate(LocalDate expiryDate) {
		this.expiryDate = expiryDate;
	}
	
	public String getCertificateLink() {
		return certificateLink;
	}
	
	public void setCertificateLink(String certificateLink) {
		this.certificateLink = certificateLink;
	}
	
	public User getUser() {
		return user;
	}
	
	public void setUser(User user) {
		this.user = user;
	}
}