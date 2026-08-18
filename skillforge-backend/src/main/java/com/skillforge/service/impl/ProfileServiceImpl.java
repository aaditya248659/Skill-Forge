package com.skillforge.service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.skillforge.dto.CreateProfileRequestDTO;
import com.skillforge.dto.ProfileResponseDTO;
import com.skillforge.entity.Profile;
import com.skillforge.entity.Resume;
import com.skillforge.entity.User;
import com.skillforge.exception.ResourceAlreadyExistsException;
import com.skillforge.exception.ResourceNotFoundException;
import com.skillforge.repository.CertificateRepository;
import com.skillforge.repository.ProfileRepository;
import com.skillforge.repository.ResumeRepository;
import com.skillforge.repository.SkillRepository;
import com.skillforge.repository.UserRepository;
import com.skillforge.service.ProfileService;

@Service
public class ProfileServiceImpl implements ProfileService {
	
    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private CertificateRepository certificateRepository;

    @Autowired
    private ResumeRepository resumeRepository;
    
    @Override
    public ProfileResponseDTO createProfile(CreateProfileRequestDTO request) {

        User user = getLoggedInUser();

        if (profileRepository.existsByUser(user)) {
            throw new ResourceAlreadyExistsException("Profile already exists");
        }

        Profile profile = new Profile();
        profile.setUser(user);

        mapRequestToProfile(profile, request);

        Profile savedProfile = profileRepository.save(profile);

        return convertToResponse(savedProfile);
    }

    @Override
    public ProfileResponseDTO getMyProfile() {

        User user = getLoggedInUser();

        Profile profile = profileRepository
                .findByUser(user)
                .orElse(null);

        if (profile == null) {
            return null;
        }

        return convertToResponse(profile);
    }

    @Override
    public ProfileResponseDTO updateProfile(CreateProfileRequestDTO request) {

        User user = getLoggedInUser();

        Profile profile = profileRepository.findByUser(user)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Profile not found"));

        mapRequestToProfile(profile, request);

        Profile updatedProfile = profileRepository.save(profile);

        return convertToResponse(updatedProfile);
    }
    
    @Override
    @Transactional
    public void deleteProfile() {

        User user = getLoggedInUser();

        Profile profile = profileRepository.findByUser(user)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Profile not found"));

        Resume resume = resumeRepository.findByUser(user).orElse(null);

        if (resume != null) {

            String filePath = resume.getResumeFile();

            if (filePath != null && !filePath.isBlank()) {

                try {
                    Files.deleteIfExists(Paths.get(filePath));
                } catch (IOException e) {
                    throw new RuntimeException(
                            "Failed to delete resume file", e);
                }
            }

            user.setResume(null);

            userRepository.save(user);

            resumeRepository.delete(resume);
        }

        skillRepository.deleteByUser(user);

        certificateRepository.deleteByUser(user);

        user.setProfile(null);
        profile.setUser(null);

        userRepository.save(user);

        profileRepository.delete(profile);
    }

    private User getLoggedInUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));
    }

    private void mapRequestToProfile(Profile profile,
                                     CreateProfileRequestDTO request) {

        profile.setPhone(request.getPhone());
        profile.setGender(request.getGender());
        profile.setDateOfBirth(request.getDateOfBirth());
        profile.setAddress(request.getAddress());
        profile.setBio(request.getBio());
        profile.setCareerGoal(request.getCareerGoal());
        profile.setCollegeName(request.getCollegeName());
        profile.setUniversity(request.getUniversity());
        profile.setDegree(request.getDegree());
        profile.setBranch(request.getBranch());
        profile.setCgpa(request.getCgpa());
        profile.setGraduationYear(request.getGraduationYear());
        profile.setCompanyName(request.getCompanyName());
        profile.setDesignation(request.getDesignation());
        profile.setExperienceYears(request.getExperienceYears());
        profile.setLinkedin(request.getLinkedin());
        profile.setGithub(request.getGithub());
    }

    private ProfileResponseDTO convertToResponse(Profile profile) {

        ProfileResponseDTO response = new ProfileResponseDTO();

        response.setProfileId(profile.getProfileId());

        response.setUserId(profile.getUser().getUserId());
        response.setFullName(profile.getUser().getFullName());
        response.setEmail(profile.getUser().getEmail());

        response.setPhone(profile.getPhone());
        response.setGender(profile.getGender());
        response.setDateOfBirth(profile.getDateOfBirth());
        response.setAddress(profile.getAddress());
        response.setBio(profile.getBio());
        response.setCareerGoal(profile.getCareerGoal());

        response.setCollegeName(profile.getCollegeName());
        response.setUniversity(profile.getUniversity());
        response.setDegree(profile.getDegree());
        response.setBranch(profile.getBranch());
        response.setCgpa(profile.getCgpa());
        response.setGraduationYear(profile.getGraduationYear());

        response.setCompanyName(profile.getCompanyName());
        response.setDesignation(profile.getDesignation());
        response.setExperienceYears(profile.getExperienceYears());

        response.setLinkedin(profile.getLinkedin());
        response.setGithub(profile.getGithub());

        return response;
    }
}