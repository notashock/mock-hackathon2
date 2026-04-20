package com.amenityManagement.server.services;

import com.amenityManagement.server.dtos.AmenityDTOs.AmenityRequest;
import com.amenityManagement.server.dtos.AmenityDTOs.AmenityResponse;
import com.amenityManagement.server.enums.AmenityStatus;
import com.amenityManagement.server.models.Amenity;
import com.amenityManagement.server.repositories.AmenityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AmenityService {

    private final AmenityRepository amenityRepository;

    public AmenityResponse createAmenity(AmenityRequest request) {
        Amenity amenity = new Amenity();
        amenity.setAmenityName(request.getAmenityName());
        amenity.setDescription(request.getDescription());
        amenity.setAvailabilityStatus(AmenityStatus.AVAILABLE);

        Amenity savedAmenity = amenityRepository.save(amenity);
        return mapToResponse(savedAmenity);
    }

    public List<AmenityResponse> getAllAmenities() {
        return amenityRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private AmenityResponse mapToResponse(Amenity amenity) {
        return AmenityResponse.builder()
                .id(amenity.getId())
                .amenityName(amenity.getAmenityName())
                .description(amenity.getDescription())
                .availabilityStatus(amenity.getAvailabilityStatus())
                .createdAt(amenity.getCreatedAt())
                .build();
    }
}