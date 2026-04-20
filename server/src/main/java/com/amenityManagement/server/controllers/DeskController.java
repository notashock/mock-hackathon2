package com.amenityManagement.server.controllers;

import com.amenityManagement.server.dtos.DeskDTOs.DeskRequest;
import com.amenityManagement.server.dtos.DeskDTOs.DeskResponse;
import com.amenityManagement.server.services.DeskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/desks")
@RequiredArgsConstructor
public class DeskController {

    private final DeskService deskService;

    @PostMapping
    @PreAuthorize("hasRole('SPACE_MANAGER')")
    public ResponseEntity<DeskResponse> createDesk(
            @Valid @RequestBody DeskRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(deskService.createDesk(request));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MEMBER', 'SPACE_MANAGER')")
    public ResponseEntity<List<DeskResponse>> getDesksByWorkspaceId(
            @RequestParam Long workspaceId
    ) {
        return ResponseEntity.ok(deskService.getDesksByWorkspaceId(workspaceId));
    }
}