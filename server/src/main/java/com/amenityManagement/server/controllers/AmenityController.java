package com.amenityManagement.server.controllers;

import com.amenityManagement.server.dtos.AmenityDTOs.AmenityRequest;
import com.amenityManagement.server.dtos.AmenityDTOs.AmenityResponse;
import com.amenityManagement.server.services.AmenityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/amenities")
@RequiredArgsConstructor
public class AmenityController {

    private final AmenityService amenityService;

    @PostMapping
    @PreAuthorize("hasRole('SPACE_MANAGER')")
    public ResponseEntity<AmenityResponse> createAmenity(
            @Valid @RequestBody AmenityRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(amenityService.createAmenity(request));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MEMBER', 'SPACE_MANAGER')")
    public ResponseEntity<List<AmenityResponse>> getAllAmenities() {
        return ResponseEntity.ok(amenityService.getAllAmenities());
    }
}