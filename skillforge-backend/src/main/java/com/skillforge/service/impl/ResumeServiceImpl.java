package com.skillforge.service.impl;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.skillforge.dto.ResumeResponseDTO;
import com.skillforge.entity.Profile;
import com.skillforge.entity.Resume;
import com.skillforge.entity.Skill;
import com.skillforge.entity.User;
import com.skillforge.enums.SkillLevel;
import com.skillforge.exception.ResourceAlreadyExistsException;
import com.skillforge.exception.ResourceNotFoundException;
import com.skillforge.repository.ProfileRepository;
import com.skillforge.repository.ResumeRepository;
import com.skillforge.repository.SkillRepository;
import com.skillforge.repository.UserRepository;
import com.skillforge.service.ResumeService;

import tools.jackson.databind.ObjectMapper;

@Service
public class ResumeServiceImpl implements ResumeService {

    private static final String UPLOAD_DIR = "uploads/resumes";

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Value("${groq.api.key}")
    private String groqApiKey;

    @Value("${groq.api.url}")
    private String groqApiUrl;

    @Value("${groq.api.model}")
    private String groqModel;

    private final RestTemplate restTemplate =
            new RestTemplate();

    private final ObjectMapper objectMapper =
            new ObjectMapper();

    @Override
    public ResumeResponseDTO uploadResume(
            String resumeTitle,
            MultipartFile file) {

        User user = getLoggedInUser();

        if (resumeRepository.findByUser(user).isPresent()) {
            throw new ResourceAlreadyExistsException(
                    "Resume already exists. Update the existing resume.");
        }

        validateResume(resumeTitle, file);

        String filePath = saveFile(file);

        Resume resume = new Resume();

        resume.setResumeTitle(resumeTitle);
        resume.setResumeFile(filePath);
        resume.setOriginalFileName(file.getOriginalFilename());
        resume.setCreatedAt(LocalDateTime.now());
        resume.setUser(user);

        Resume savedResume = resumeRepository.save(resume);

        return convertToResponse(savedResume);
    }

    @Override
    public ResumeResponseDTO getMyResume() {

        User user = getLoggedInUser();

        Resume resume = resumeRepository.findByUser(user)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Resume not found"));

        return convertToResponse(resume);
    }
    
    @Override
    public ResponseEntity<?> viewResume() {

        User user = getLoggedInUser();

        Resume resume = resumeRepository.findByUser(user)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Resume not found"));

        String filePath = resume.getResumeFile();

        if (filePath == null || filePath.isBlank()) {
            throw new ResourceNotFoundException(
                    "Resume file path not found");
        }

        Path path = Paths.get(filePath)
                .toAbsolutePath()
                .normalize();

        if (!Files.exists(path)) {
            throw new ResourceNotFoundException(
                    "Resume PDF file not found");
        }

        try {

            byte[] fileBytes = Files.readAllBytes(path);

            ByteArrayResource resource =
                    new ByteArrayResource(fileBytes);

            HttpHeaders headers = new HttpHeaders();

            headers.setContentType(
                    MediaType.APPLICATION_PDF);

            headers.setContentLength(
                    fileBytes.length);

            headers.set(
                    HttpHeaders.CONTENT_DISPOSITION,
                    "inline; filename=\"" +
                    resume.getOriginalFileName() +
                    "\"");

            return new ResponseEntity<>(
                    resource,
                    headers,
                    org.springframework.http.HttpStatus.OK);

        } catch (IOException e) {

            throw new RuntimeException(
                    "Failed to open resume PDF",
                    e);
        }
    }

    @Override
    public ResumeResponseDTO updateResume(
            String resumeTitle,
            MultipartFile file) {

        User user = getLoggedInUser();

        Resume resume = resumeRepository.findByUser(user)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Resume not found"));

        validateResume(resumeTitle, file);

        String oldFilePath = resume.getResumeFile();
        String newFilePath = saveFile(file);

        resume.setResumeTitle(resumeTitle);
        resume.setResumeFile(newFilePath);
        resume.setOriginalFileName(file.getOriginalFilename());
        resume.setCreatedAt(LocalDateTime.now());

        Resume updatedResume;

        try {
            updatedResume = resumeRepository.save(resume);
        } catch (RuntimeException e) {
            deleteFileIfExists(newFilePath);
            throw e;
        }

        deleteFileIfExists(oldFilePath);

        return convertToResponse(updatedResume);
    }

    @Override
    public void deleteResume() {

        User user = getLoggedInUser();

        Resume resume = resumeRepository.findByUser(user)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Resume not found"));

        String filePath = resume.getResumeFile();

        user.setResume(null);

        resumeRepository.delete(resume);

        deleteFileIfExists(filePath);
    }
    @Override
    public ResumeResponseDTO extractResumeData() {

        User user = getLoggedInUser();

        Resume resume = resumeRepository.findByUser(user)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Resume not found"));

        String resumeText =
                extractPdfText(resume.getResumeFile());

        String prompt =
                """
                You are an expert resume parser.

                Read the resume carefully.

                Extract ONLY information explicitly available in the resume.

                Never guess.

                If a value is unavailable:

                - Return "" for text
                - Return 0 for numbers
                - Return [] for arrays

                Never invent:

                - Universities
                - Companies
                - Skills
                - Certificates
                - Experience

                Return ONLY raw JSON.

                Do NOT write explanations.

                Do NOT use markdown.

                Do NOT wrap inside ```json.

                Use EXACTLY this JSON format.

                {
                  "fullName":"",
                  "email":"",
                  "phone":"",
                  "address":"",
                  "bio":"",
                  "linkedin":"",
                  "github":"",

                  "collegeName":"",
                  "university":"",
                  "degree":"",
                  "branch":"",
                  "graduationYear":0,

                  "companyName":"",
                  "designation":"",
                  "experienceYears":0.0,

                  "skills":[
                    ""
                  ],

                  "certificates":[
                    {
                      "certificateName":"",
                      "issuingOrganization":"",
                      "issueYear":0
                    }
                  ],

                  "recommendedSkills":[
                    ""
                  ],

                  "careerSuggestions":[
                    ""
                  ]
                }

                Resume:

                """ + resumeText;

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(groqApiKey);

        Map<String, Object> requestBody =
                Map.of(
                        "model", groqModel,
                        "messages",
                        List.of(
                                Map.of(
                                        "role", "user",
                                        "content", prompt
                                )
                        ),
                        "temperature", 0.2
                );

        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response =
                restTemplate.postForEntity(
                        groqApiUrl,
                        request,
                        Map.class
                );

        Map<String, Object> body = response.getBody();

        if (body == null) {
            throw new RuntimeException(
                    "Empty response from Groq");
        }

        List<Map<String, Object>> choices =
                (List<Map<String, Object>>) body.get("choices");

        if (choices == null || choices.isEmpty()) {
            throw new RuntimeException(
                    "No response from Groq");
        }

        Map<String, Object> message =
                (Map<String, Object>) choices.get(0).get("message");

        String aiResponse =
                message.get("content").toString();

        System.out.println("========== AI RESPONSE ==========");
        System.out.println(aiResponse);
        System.out.println("=================================");

        try {

            aiResponse = aiResponse
                    .replaceAll("(?s)^```json\\s*", "")
                    .replaceAll("(?s)^```\\s*", "")
                    .replaceAll("\\s*```$", "")
                    .trim();

            ResumeResponseDTO dto =
                    objectMapper.readValue(
                            aiResponse,
                            ResumeResponseDTO.class);

            dto.setResumeId(resume.getResumeId());
            dto.setResumeTitle(resume.getResumeTitle());
            dto.setResumeFile(resume.getOriginalFileName());
            dto.setCreatedAt(resume.getCreatedAt());
            dto.setUserId(user.getUserId());

            return dto;

        } catch (Exception e) {

            e.printStackTrace();

            throw new RuntimeException(
                    "Failed to parse AI response",
                    e);
        }
    }

    private boolean hasValue(String value) {

        return value != null &&
               !value.isBlank() &&
               !"null".equalsIgnoreCase(value.trim());
    }
    @Override
    public void applyResumeData() {

        User user = getLoggedInUser();

        ResumeResponseDTO dto = extractResumeData();

        Profile profile = profileRepository.findByUser(user)
                .orElseGet(() -> {
                    Profile p = new Profile();
                    p.setUser(user);
                    return profileRepository.save(p);
                });

        if (hasValue(dto.getPhone())) {
            profile.setPhone(dto.getPhone());
        }

        if (hasValue(dto.getAddress())) {
            profile.setAddress(dto.getAddress());
        }

        if (hasValue(dto.getBio())) {
            profile.setBio(dto.getBio());
        }

        if (hasValue(dto.getLinkedin())) {
            profile.setLinkedin(dto.getLinkedin());
        }

        if (hasValue(dto.getGithub())) {
            profile.setGithub(dto.getGithub());
        }

        if (hasValue(dto.getCollegeName())) {
            profile.setCollegeName(dto.getCollegeName());
        }

        if (hasValue(dto.getUniversity())) {
            profile.setUniversity(dto.getUniversity());
        }

        if (hasValue(dto.getDegree())) {
            profile.setDegree(dto.getDegree());
        }

        if (hasValue(dto.getBranch())) {
            profile.setBranch(dto.getBranch());
        }

        if (dto.getGraduationYear() != null &&
                dto.getGraduationYear() > 0) {
            profile.setGraduationYear(dto.getGraduationYear());
        }

        if (hasValue(dto.getCompanyName())) {
            profile.setCompanyName(dto.getCompanyName());
        }

        if (hasValue(dto.getDesignation())) {
            profile.setDesignation(dto.getDesignation());
        }

        if (dto.getExperienceYears() != null) {
            profile.setExperienceYears(dto.getExperienceYears());
        }

        profileRepository.save(profile);

        if (dto.getSkills() != null) {

            for (String skillName : dto.getSkills()) {

                if (skillName == null) {
                    continue;
                }

                skillName = skillName.trim();

                if (skillName.isBlank()) {
                    continue;
                }

                boolean exists =
                        skillRepository.existsByUserAndSkillNameIgnoreCase(
                                user,
                                skillName);

                if (exists) {
                    continue;
                }

                Skill skill = new Skill();

                skill.setUser(user);
                skill.setSkillName(skillName);
                skill.setCategory("Resume");
                skill.setSkillLevel(SkillLevel.INTERMEDIATE);
                skill.setDescription("Imported from AI Resume");

                skillRepository.save(skill);
            }
        }
    }

    private User getLoggedInUser() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"));
    }

    private void validateResume(
            String resumeTitle,
            MultipartFile file) {

        if (resumeTitle == null ||
                resumeTitle.trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Resume title is required");
        }

        if (file == null ||
                file.isEmpty()) {

            throw new IllegalArgumentException(
                    "Resume PDF file is required");
        }

        String originalFilename =
                file.getOriginalFilename();

        if (originalFilename == null ||
                !originalFilename
                        .toLowerCase()
                        .endsWith(".pdf")) {

            throw new IllegalArgumentException(
                    "Only PDF files are allowed");
        }

        String contentType =
                file.getContentType();

        if (contentType != null &&
                !contentType.equalsIgnoreCase(
                        "application/pdf")) {

            throw new IllegalArgumentException(
                    "Only PDF files are allowed");
        }
    }

    private String saveFile(MultipartFile file) {

        try {

            Path uploadPath =
                    Paths.get(UPLOAD_DIR)
                            .toAbsolutePath()
                            .normalize();

            Files.createDirectories(uploadPath);

            String fileName =
                    UUID.randomUUID() + ".pdf";

            Path targetPath =
                    uploadPath.resolve(fileName)
                            .normalize();

            Files.copy(
                    file.getInputStream(),
                    targetPath,
                    StandardCopyOption.REPLACE_EXISTING);

            return targetPath.toString();

        } catch (IOException e) {

            throw new RuntimeException(
                    "Failed to store resume file",
                    e);
        }
    }

    private void deleteFileIfExists(
            String filePath) {

        if (filePath == null ||
                filePath.isBlank()) {
            return;
        }

        try {

            Files.deleteIfExists(
                    Paths.get(filePath));

        } catch (IOException e) {

            throw new RuntimeException(
                    "Failed to delete resume file",
                    e);
        }
    }

    private ResumeResponseDTO convertToResponse(
            Resume resume) {

        ResumeResponseDTO response =
                new ResumeResponseDTO();

        response.setResumeId(
                resume.getResumeId());

        response.setUserId(
                resume.getUser().getUserId());

        response.setFullName(
                resume.getUser().getFullName());

        response.setResumeTitle(
                resume.getResumeTitle());

        response.setResumeFile(
                resume.getOriginalFileName());

        response.setCreatedAt(
                resume.getCreatedAt());

        return response;
    }

    private String extractPdfText(
            String filePath) {

        File file = new File(filePath);

        if (!file.exists()) {

            throw new ResourceNotFoundException(
                    "Resume PDF file not found");
        }

        try (PDDocument document =
                     Loader.loadPDF(file)) {

            PDFTextStripper stripper =
                    new PDFTextStripper();

            return stripper.getText(document);

        } catch (IOException e) {

            throw new RuntimeException(
                    "Failed to read resume PDF",
                    e);
        }
    }
}