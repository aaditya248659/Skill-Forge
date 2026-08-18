package com.skillforge.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.skillforge.dto.DashboardResponseDTO;
import com.skillforge.entity.LearningGoal;
import com.skillforge.entity.User;
import com.skillforge.enums.GoalStatus;
import com.skillforge.exception.ResourceNotFoundException;
import com.skillforge.repository.CertificateRepository;
import com.skillforge.repository.LearningGoalRepository;
import com.skillforge.repository.LearningResourceRepository;
import com.skillforge.repository.ProjectRepository;
import com.skillforge.repository.ResumeRepository;
import com.skillforge.repository.SkillRepository;
import com.skillforge.repository.UserRepository;
import com.skillforge.service.DashboardService;

@Service
public class DashboardServiceImpl implements DashboardService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private SkillRepository skillRepository;
	
	@Autowired
	private ProjectRepository projectRepository;
	
	@Autowired
	private CertificateRepository certificateRepository;
	
	@Autowired
	private LearningResourceRepository learningResourceRepository;
	
	@Autowired
	private LearningGoalRepository learningGoalRepository;
	
	@Autowired
	private ResumeRepository resumeRepository;
	
	@Override
	public DashboardResponseDTO getDashboard() {
		
		User user = getLoggedInUser();
		
		List<LearningGoal> goals = 
				learningGoalRepository.findByUser(user);
		
		long completeGoals = goals.stream()
				.filter(goal ->
						goal.getStatus() == GoalStatus.COMPLETED)
				.count();
		
		double averageGoalProgress = goals.stream()
				.mapToInt(LearningGoal::getProgress)
				.average()
				.orElse(0.0);
		
		DashboardResponseDTO response = 
				new DashboardResponseDTO();
		
		response.setUserId(user.getUserId());
		response.setFullName(user.getFullName());
		response.setEmail(user.getEmail());
		response.setProfileType(user.getProfileType());
		
		response.setTotalSkills(
				skillRepository.findByUser(user).size());
		
		response.setTotalProjects(
				projectRepository.findByUser(user).size());
		
		response.setTotalCertificates(
				certificateRepository
					.findByUserUserId(user.getUserId())
					.size());
		
		response.setTotalLearningResources(
				learningResourceRepository
					.findByUserUserId(user.getUserId())
					.size());
		
		response.setTotalLearningGoals(goals.size());
		
		response.setCompletedGoals(completeGoals);
		
		response.setAverageGoalProgress(averageGoalProgress);
		
		response.setHasResume(
				resumeRepository.findByUser(user).isPresent());
		
		return response;
	}
	
	private User getLoggedInUser() {
		
		Authentication authentication = 
				SecurityContextHolder
					.getContext()
					.getAuthentication();
		
		String email = authentication.getName();
		
		return userRepository.findByEmail(email)
				.orElseThrow(() ->
						new ResourceNotFoundException("User not found"));
	}
}
