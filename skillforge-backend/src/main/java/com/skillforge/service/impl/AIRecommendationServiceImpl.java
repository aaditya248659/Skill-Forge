package com.skillforge.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.skillforge.dto.AIRecommendationResponseDTO;
import com.skillforge.dto.AIRecommendedResourceDTO;
import com.skillforge.entity.Profile;
import com.skillforge.entity.Skill;
import com.skillforge.entity.User;
import com.skillforge.enums.ResourceType;
import com.skillforge.exception.ResourceNotFoundException;
import com.skillforge.repository.ProfileRepository;
import com.skillforge.repository.SkillRepository;
import com.skillforge.repository.UserRepository;
import com.skillforge.service.AIRecommendationService;

import tools.jackson.databind.ObjectMapper;

@Service
public class AIRecommendationServiceImpl implements AIRecommendationService {

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

    private final RestTemplate restTemplate = new RestTemplate();

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public AIRecommendationResponseDTO getRecommendations() {

        User user = getLoggedInUser();

        Profile profile = profileRepository.findByUser(user)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Profile not found"));

        List<Skill> skills = skillRepository.findByUser(user);

        StringBuilder skillDetails = new StringBuilder();

        for (Skill skill : skills) {
            skillDetails.append("- ")
                    .append(skill.getSkillName())
                    .append(" (")
                    .append(skill.getSkillLevel())
                    .append(")\n");
        }

        String prompt =
                "Analyze the following user profile and create a personalized "
                + "career learning plan.\n\n"

                + "Profile Type: " + user.getProfileType() + "\n"
                + "Degree: " + profile.getDegree() + "\n"
                + "Branch: " + profile.getBranch() + "\n"
                + "College: " + profile.getCollegeName() + "\n"
                + "Graduation Year: " + profile.getGraduationYear() + "\n"
                + "Current Company: " + profile.getCompanyName() + "\n"
                + "Designation: " + profile.getDesignation() + "\n"
                + "Experience Years: " + profile.getExperienceYears() + "\n"
                + "Bio: " + profile.getBio() + "\n"
                + "Career Goal: " + profile.getCareerGoal() + "\n"
                + "Current Skills:\n" + skillDetails

                + "\nInstructions:\n"
                + "1. Base recommendations strictly on the career goal, profile, "
                + "experience, and existing skills.\n"
                + "2. Do not recommend a skill as a major skill gap when the user "
                + "already has strong proficiency in it.\n"
                + "3. Recommend exactly 5 important skills to learn or improve next.\n"
                + "4. Prioritize skills directly useful for the stated career goal.\n"
                + "5. Create a practical learning roadmap in dependency order.\n"
                + "6. Keep recommendations focused and avoid unrelated technologies.\n"

                + "\nReturn ONLY valid JSON using exactly this structure:\n"
                + "{\n"
                + "  \"careerSummary\": \"brief personalized career analysis\",\n"
                + "  \"skillGaps\": [\"gap 1\", \"gap 2\", \"gap 3\"],\n"
                + "  \"recommendedSkills\": "
                + "[\"skill 1\", \"skill 2\", \"skill 3\", \"skill 4\", \"skill 5\"],\n"
                + "  \"learningRoadmap\": "
                + "[\"step 1\", \"step 2\", \"step 3\", \"step 4\", \"step 5\"],\n"
                + "  \"recommendedResources\": []\n"
                + "}\n"

                + "Do not generate learning resources or URLs.\n"
                + "Do not include markdown, code fences, headings, "
                + "or text outside the JSON.";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(groqApiKey);

        Map<String, Object> requestBody = Map.of(
                "model", groqModel,
                "messages", List.of(
                        Map.of(
                                "role", "user",
                                "content", prompt
                        )
                ),
                "temperature", 0.3
        );

        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response =
                restTemplate.postForEntity(
                        groqApiUrl,
                        request,
                        Map.class
                );

        Map<String, Object> responseBody = response.getBody();

        if (responseBody == null) {
            throw new RuntimeException("Empty response from Groq");
        }

        List<Map<String, Object>> choices =
                (List<Map<String, Object>>) responseBody.get("choices");

        if (choices == null || choices.isEmpty()) {
            throw new RuntimeException("No recommendation returned by Groq");
        }

        Map<String, Object> message =
                (Map<String, Object>) choices.get(0).get("message");

        if (message == null || message.get("content") == null) {
            throw new RuntimeException("Invalid response from Groq");
        }

        String aiResponse = message.get("content").toString();

        System.out.println("Groq Response:");
        System.out.println(aiResponse);

        try {
            AIRecommendationResponseDTO recommendation =
            		objectMapper.readValue(
            				aiResponse,
            				AIRecommendationResponseDTO.class
            				);
            
            recommendation.setRecommendedResources(
            		buildLearningResources(
            				recommendation.getRecommendedSkills()
            				)
            		);
            return recommendation;
            
        } catch (Exception e) {
            throw new RuntimeException(
                    "Failed to process AI recommendation", e);
        }
    }

    private User getLoggedInUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));
    }
    
    private List<AIRecommendedResourceDTO> buildLearningResources(
            List<String> recommendedSkills) {

        List<AIRecommendedResourceDTO> resources =
                new ArrayList<>();

        if (recommendedSkills == null) {
            return resources;
        }

        for (String skill : recommendedSkills) {

            if (skill == null || skill.isBlank()) {
                continue;
            }

            addKnownResources(resources, skill);
        }

        return resources;
    }
    
    private void addKnownResources(
            List<AIRecommendedResourceDTO> resources,
            String skill) {

        String normalized =
                skill.toLowerCase().trim();

        if (normalized.contains("spring boot")) {

            resources.add(new AIRecommendedResourceDTO(
                    "Spring Boot Official Guides",
                    ResourceType.DOCUMENTATION,
                    "https://spring.io/guides",
                    "Free official Spring learning guides for Spring Boot."
            ));

            resources.add(new AIRecommendedResourceDTO(
                    "Spring Boot - freeCodeCamp",
                    ResourceType.YOUTUBE,
                    "https://www.youtube.com/@freecodecamp",
                    "Free video learning resource for Spring Boot."
            ));

            resources.add(new AIRecommendedResourceDTO(
                    "Spring Boot Courses - Coursera",
                    ResourceType.COURSE,
                    "https://www.coursera.org/search?query=spring%20boot",
                    "Find structured Spring Boot courses with certificate options."
            ));

            return;
        }

        if (normalized.equals("react")
                || normalized.contains("react.js")
                || normalized.contains("reactjs")) {

            resources.add(new AIRecommendedResourceDTO(
                    "React Official Learn",
                    ResourceType.DOCUMENTATION,
                    "https://react.dev/learn",
                    "Free official React learning documentation."
            ));

            resources.add(new AIRecommendedResourceDTO(
                    "React - freeCodeCamp",
                    ResourceType.YOUTUBE,
                    "https://www.youtube.com/@freecodecamp",
                    "Free React tutorials and full-length courses."
            ));

            resources.add(new AIRecommendedResourceDTO(
                    "React Courses - Coursera",
                    ResourceType.COURSE,
                    "https://www.coursera.org/search?query=react",
                    "Structured React courses with certificate options."
            ));

            return;
        }

        if (normalized.contains("docker")) {

            resources.add(new AIRecommendedResourceDTO(
                    "Docker Get Started",
                    ResourceType.DOCUMENTATION,
                    "https://docs.docker.com/get-started/",
                    "Free official Docker beginner learning resource."
            ));

            resources.add(new AIRecommendedResourceDTO(
                    "Docker - freeCodeCamp",
                    ResourceType.YOUTUBE,
                    "https://www.youtube.com/@freecodecamp",
                    "Free Docker video tutorials and courses."
            ));

            resources.add(new AIRecommendedResourceDTO(
                    "Docker Courses - Coursera",
                    ResourceType.COURSE,
                    "https://www.coursera.org/search?query=docker",
                    "Structured Docker courses with certificate options."
            ));

            return;
        }

        addGenericResources(resources, skill);
    }
    
    private void addGenericResources(
            List<AIRecommendedResourceDTO> resources,
            String skill) {

        String encodedSkill =
                skill.trim().replace(" ", "+");

        resources.add(new AIRecommendedResourceDTO(
                skill + " - freeCodeCamp",
                ResourceType.YOUTUBE,
                "https://www.youtube.com/@freecodecamp/search?query="
                        + encodedSkill,
                "Free video tutorials related to " + skill + "."
        ));

        resources.add(new AIRecommendedResourceDTO(
                skill + " - Official and Free Learning Resources",
                ResourceType.WEBSITE,
                "https://www.google.com/search?q="
                        + encodedSkill
                        + "+official+documentation+tutorial",
                "Find official documentation and free learning material for "
                        + skill + "."
        ));

        resources.add(new AIRecommendedResourceDTO(
                skill + " Courses - Coursera",
                ResourceType.COURSE,
                "https://www.coursera.org/search?query="
                        + encodedSkill,
                "Find structured courses and certificate options for "
                        + skill + "."
        ));
    }
}