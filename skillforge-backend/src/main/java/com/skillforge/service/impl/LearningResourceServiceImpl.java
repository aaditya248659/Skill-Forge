package com.skillforge.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.skillforge.dto.LearningResourceRequestDTO;
import com.skillforge.dto.LearningResourceResponseDTO;
import com.skillforge.entity.LearningResource;
import com.skillforge.entity.User;
import com.skillforge.exception.ResourceNotFoundException;
import com.skillforge.repository.LearningResourceRepository;
import com.skillforge.repository.UserRepository;
import com.skillforge.service.LearningResourceService;

@Service
public class LearningResourceServiceImpl implements LearningResourceService {

    @Autowired
    private LearningResourceRepository learningResourceRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public LearningResourceResponseDTO addResource(
            LearningResourceRequestDTO requestDTO) {

        User user = getLoggedInUser();

        LearningResource resource = new LearningResource();

        resource.setTitle(requestDTO.getTitle());
        resource.setResourceType(requestDTO.getResourceType());
        resource.setResourceLink(requestDTO.getResourceLink());
        resource.setDescription(requestDTO.getDescription());
        resource.setUser(user);

        LearningResource savedResource =
                learningResourceRepository.save(resource);

        return convertToResponse(savedResource);
    }

    @Override
    public List<LearningResourceResponseDTO> getMyResources() {

        User user = getLoggedInUser();

        return learningResourceRepository
                .findByUserUserId(user.getUserId())
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public LearningResourceResponseDTO getResourceById(Long resourceId) {

        User user = getLoggedInUser();

        LearningResource resource = learningResourceRepository
                .findById(resourceId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Learning resource not found"));

        if (!resource.getUser().getUserId().equals(user.getUserId())) {
            throw new ResourceNotFoundException(
                    "Learning resource not found");
        }

        return convertToResponse(resource);
    }

    @Override
    public LearningResourceResponseDTO updateResource(
            Long resourceId,
            LearningResourceRequestDTO requestDTO) {

        User user = getLoggedInUser();

        LearningResource resource = learningResourceRepository
                .findById(resourceId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Learning resource not found"));

        if (!resource.getUser().getUserId().equals(user.getUserId())) {
            throw new ResourceNotFoundException(
                    "Learning resource not found");
        }

        resource.setTitle(requestDTO.getTitle());
        resource.setResourceType(requestDTO.getResourceType());
        resource.setResourceLink(requestDTO.getResourceLink());
        resource.setDescription(requestDTO.getDescription());

        LearningResource updatedResource =
                learningResourceRepository.save(resource);

        return convertToResponse(updatedResource);
    }

    @Override
    public void deleteResource(Long resourceId) {

        User user = getLoggedInUser();

        LearningResource resource = learningResourceRepository
                .findById(resourceId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Learning resource not found"));

        if (!resource.getUser().getUserId().equals(user.getUserId())) {
            throw new ResourceNotFoundException(
                    "Learning resource not found");
        }

        learningResourceRepository.delete(resource);
    }

    private User getLoggedInUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));
    }

    private LearningResourceResponseDTO convertToResponse(
            LearningResource resource) {

        LearningResourceResponseDTO response =
                new LearningResourceResponseDTO();

        response.setResourceId(resource.getResourceId());
        response.setUserId(resource.getUser().getUserId());
        response.setFullName(resource.getUser().getFullName());
        response.setTitle(resource.getTitle());
        response.setResourceType(resource.getResourceType());
        response.setResourceLink(resource.getResourceLink());
        response.setDescription(resource.getDescription());

        return response;
    }
}