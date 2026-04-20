package com.amenityManagement.server.controllers;

import com.amenityManagement.server.dtos.AmenityDTOs.AmenityRequest;
import com.amenityManagement.server.dtos.AmenityDTOs.AmenityResponse;
import com.amenityManagement.server.dtos.AmenityResDTOs.AmenityResRequest;
import com.amenityManagement.server.dtos.AmenityResDTOs.AmenityResResponse;
import com.amenityManagement.server.enums.ReservationStatus;
import com.amenityManagement.server.services.AmenityService;
import com.amenityManagement.server.services.AmenityReservationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AmenityController {

    private final AmenityService amenityService;
    private final AmenityReservationService amenityReservationService;

    @PostMapping("/amenities")
    @PreAuthorize("hasRole('SPACE_MANAGER')")
    public ResponseEntity<AmenityResponse> createAmenity(
            @Valid @RequestBody AmenityRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(amenityService.createAmenity(request));
    }

    @GetMapping("/amenities")
    @PreAuthorize("hasAnyRole('ADMIN', 'MEMBER', 'SPACE_MANAGER')")
    public ResponseEntity<List<AmenityResponse>> getAllAmenities() {
        return ResponseEntity.ok(amenityService.getAllAmenities());
    }

    @PostMapping("/amenity-reservations")
    @PreAuthorize("hasRole('MEMBER')")
    public ResponseEntity<AmenityResResponse> requestAmenity(
            @Valid @RequestBody AmenityResRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(amenityReservationService.requestAmenity(request));
    }

    @PutMapping("/amenity-reservations/{id}/approve")
    @PreAuthorize("hasRole('SPACE_MANAGER')")
    public ResponseEntity<AmenityResResponse> approveReservation(@PathVariable Long id) {
        return ResponseEntity.ok(amenityReservationService.updateReservationStatus(id, ReservationStatus.APPROVED));
    }

    @PutMapping("/amenity-reservations/{id}/reject")
    @PreAuthorize("hasRole('SPACE_MANAGER')")
    public ResponseEntity<AmenityResResponse> rejectReservation(@PathVariable Long id) {
        return ResponseEntity.ok(amenityReservationService.updateReservationStatus(id, ReservationStatus.REJECTED));
    }

    @GetMapping("/amenity-reservations")
    @PreAuthorize("hasAnyRole('SPACE_MANAGER', 'ADMIN')")
    public ResponseEntity<List<AmenityResResponse>> getAllReservations() {
        return ResponseEntity.ok(amenityReservationService.getAllReservations());
    }
}