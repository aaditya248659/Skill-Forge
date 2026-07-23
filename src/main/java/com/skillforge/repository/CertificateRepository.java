package com.skillforge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillforge.entity.Certificate;

@Repository
public interface CertificateRepository extends JpaRepository<Certificate, Long> {

}