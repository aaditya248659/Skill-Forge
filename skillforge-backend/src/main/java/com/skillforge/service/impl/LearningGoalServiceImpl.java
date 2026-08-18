package com.skillforge.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.skillforge.dto.LearningGoalRequestDTO;
import com.skillforge.dto.LearningGoalResponseDTO;
import com.skillforge.entity.LearningGoal;
import com.skillforge.entity.User;
import com.skillforge.enums.GoalStatus;
import com.skillforge.exception.ResourceNotFoundException;
import com.skillforge.repository.LearningGoalRepository;
import com.skillforge.repository.UserRepository;
import com.skillforge.service.LearningGoalService;

@Service
public class LearningGoalServiceImpl implements LearningGoalService {

    @Autowired
    private LearningGoalRepository learningGoalRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public LearningGoalResponseDTO addGoal(
            LearningGoalRequestDTO requestDTO) {

        User user = getLoggedInUser();

        validateStatusAndProgress(
                requestDTO.getStatus(),
                requestDTO.getProgress());

        LearningGoal goal = new LearningGoal();

        goal.setGoalTitle(requestDTO.getGoalTitle());
        goal.setDescription(requestDTO.getDescription());
        goal.setTargetDate(requestDTO.getTargetDate());
        goal.setStatus(requestDTO.getStatus());
        goal.setProgress(requestDTO.getProgress());
        goal.setUser(user);

        LearningGoal savedGoal = learningGoalRepository.save(goal);

        return convertToResponse(savedGoal);
    }

    @Override
    public List<LearningGoalResponseDTO> getMyGoals() {

        User user = getLoggedInUser();

        return learningGoalRepository.findByUser(user)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public LearningGoalResponseDTO getGoalById(Long goalId) {

        User user = getLoggedInUser();

        LearningGoal goal = learningGoalRepository.findById(goalId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Learning goal not found"));

        if (!goal.getUser().getUserId().equals(user.getUserId())) {
            throw new ResourceNotFoundException(
                    "Learning goal not found");
        }

        return convertToResponse(goal);
    }

    @Override
    public LearningGoalResponseDTO updateGoal(
            Long goalId,
            LearningGoalRequestDTO requestDTO) {

        User user = getLoggedInUser();

        LearningGoal goal = learningGoalRepository.findById(goalId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Learning goal not found"));

        if (!goal.getUser().getUserId().equals(user.getUserId())) {
            throw new ResourceNotFoundException(
                    "Learning goal not found");
        }

        validateStatusAndProgress(
                requestDTO.getStatus(),
                requestDTO.getProgress());

        goal.setGoalTitle(requestDTO.getGoalTitle());
        goal.setDescription(requestDTO.getDescription());
        goal.setTargetDate(requestDTO.getTargetDate());
        goal.setStatus(requestDTO.getStatus());
        goal.setProgress(requestDTO.getProgress());

        LearningGoal updatedGoal = learningGoalRepository.save(goal);

        return convertToResponse(updatedGoal);
    }

    @Override
    public void deleteGoal(Long goalId) {

        User user = getLoggedInUser();

        LearningGoal goal = learningGoalRepository.findById(goalId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Learning goal not found"));

        if (!goal.getUser().getUserId().equals(user.getUserId())) {
            throw new ResourceNotFoundException(
                    "Learning goal not found");
        }

        learningGoalRepository.delete(goal);
    }

    private User getLoggedInUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));
    }

    private void validateStatusAndProgress(
            GoalStatus status,
            Integer progress) {

        if (status == GoalStatus.NOT_STARTED && progress != 0) {
            throw new IllegalArgumentException(
                    "Progress must be 0 when goal is NOT_STARTED");
        }

        if (status == GoalStatus.IN_PROGRESS
                && (progress < 1 || progress > 99)) {
            throw new IllegalArgumentException(
                    "Progress must be between 1 and 99 when goal is IN_PROGRESS");
        }

        if (status == GoalStatus.COMPLETED && progress != 100) {
            throw new IllegalArgumentException(
                    "Progress must be 100 when goal is COMPLETED");
        }
    }

    private LearningGoalResponseDTO convertToResponse(
            LearningGoal goal) {

        LearningGoalResponseDTO response =
                new LearningGoalResponseDTO();

        response.setGoalId(goal.getGoalId());
        response.setUserId(goal.getUser().getUserId());
        response.setFullName(goal.getUser().getFullName());
        response.setGoalTitle(goal.getGoalTitle());
        response.setDescription(goal.getDescription());
        response.setTargetDate(goal.getTargetDate());
        response.setStatus(goal.getStatus());
        response.setProgress(goal.getProgress());

        return response;
    }
}