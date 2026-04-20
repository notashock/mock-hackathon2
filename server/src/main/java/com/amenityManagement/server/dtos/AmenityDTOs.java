package com.amenityManagement.server.dtos;

import com.amenityManagement.server.enums.AmenityStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class AmenityDTOs {

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AmenityRequest {
        @NotBlank(message = "Amenity name is required")
        private String amenityName;

        private String description;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AmenityResponse {
        private Long id;
        private String amenityName;
        private String description;
        private AmenityStatus availabilityStatus;
        private LocalDateTime createdAt;
    }
}