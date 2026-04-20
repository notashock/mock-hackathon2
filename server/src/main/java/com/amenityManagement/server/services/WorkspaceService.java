package com.amenityManagement.server.services;

import com.amenityManagement.server.dtos.WorkspaceDTOs.WorkspaceRequest;
import com.amenityManagement.server.dtos.WorkspaceDTOs.WorkspaceResponse;
import com.amenityManagement.server.enums.WorkspaceStatus;
import com.amenityManagement.server.models.User;
import com.amenityManagement.server.models.Workspace;
import com.amenityManagement.server.repositories.UserRepository;
import com.amenityManagement.server.repositories.WorkspaceRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkspaceService {

    private final WorkspaceRepository workspaceRepository;
    private final UserRepository userRepository;

    public WorkspaceResponse createWorkspace(WorkspaceRequest request, String userEmail) {
        User spaceManager = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Workspace workspace = new Workspace();
        workspace.setWorkspaceName(request.getWorkspaceName());
        workspace.setLocation(request.getLocation());
        workspace.setTotalDesks(request.getTotalDesks());
        workspace.setAvailableDesks(request.getTotalDesks());
        workspace.setStatus(WorkspaceStatus.ACTIVE);
        workspace.setCreatedBy(spaceManager);

        Workspace savedWorkspace = workspaceRepository.save(workspace);
        return mapToResponse(savedWorkspace);
    }

    public List<WorkspaceResponse> getAllWorkspaces() {
        return workspaceRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public WorkspaceResponse getWorkspaceById(Long id) {
        Workspace workspace = workspaceRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Workspace not found"));
        return mapToResponse(workspace);
    }

    private WorkspaceResponse mapToResponse(Workspace workspace) {
        return WorkspaceResponse.builder()
                .id(workspace.getId())
                .workspaceName(workspace.getWorkspaceName())
                .location(workspace.getLocation())
                .totalDesks(workspace.getTotalDesks())
                .availableDesks(workspace.getAvailableDesks())
                .status(workspace.getStatus())
                .createdById(workspace.getCreatedBy().getId())
                .createdByName(workspace.getCreatedBy().getName())
                .createdAt(workspace.getCreatedAt())
                .build();
    }
}