package com.amenityManagement.server.services;

import com.amenityManagement.server.dtos.DeskDTOs.DeskRequest;
import com.amenityManagement.server.dtos.DeskDTOs.DeskResponse;
import com.amenityManagement.server.enums.DeskStatus;
import com.amenityManagement.server.models.Desk;
import com.amenityManagement.server.models.Workspace;
import com.amenityManagement.server.repositories.DeskRepository;
import com.amenityManagement.server.repositories.WorkspaceRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DeskService {

    private final DeskRepository deskRepository;
    private final WorkspaceRepository workspaceRepository;

    public DeskResponse createDesk(DeskRequest request) {
        Workspace workspace = workspaceRepository.findById(request.getWorkspaceId())
                .orElseThrow(() -> new EntityNotFoundException("Workspace not found"));

        Desk desk = new Desk();
        desk.setWorkspace(workspace);
        desk.setDeskNumber(request.getDeskNumber());
        desk.setDeskType(request.getDeskType());
        desk.setAvailabilityStatus(DeskStatus.AVAILABLE);

        Desk savedDesk = deskRepository.save(desk);
        return mapToResponse(savedDesk);
    }

    public List<DeskResponse> getDesksByWorkspaceId(Long workspaceId) {
        if (!workspaceRepository.existsById(workspaceId)) {
            throw new EntityNotFoundException("Workspace not found");
        }

        return deskRepository.findByWorkspaceId(workspaceId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private DeskResponse mapToResponse(Desk desk) {
        return DeskResponse.builder()
                .id(desk.getId())
                .workspaceId(desk.getWorkspace().getId())
                .workspaceName(desk.getWorkspace().getWorkspaceName())
                .deskNumber(desk.getDeskNumber())
                .deskType(desk.getDeskType())
                .availabilityStatus(desk.getAvailabilityStatus())
                .createdAt(desk.getCreatedAt())
                .build();
    }
}