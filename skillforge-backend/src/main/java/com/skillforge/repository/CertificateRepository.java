package com.skillforge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillforge.entity.Certificate;
import com.skillforge.entity.User;

@Repository
public interface CertificateRepository extends JpaRepository<Certificate, Long> {
	
		List<Certificate> findByUserUserId(Long userId);
		
		void deleteByUser(User user);
}