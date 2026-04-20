package com.amenityManagement.server.dtos;

import com.amenityManagement.server.enums.ReservationStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

public class AmenityResDTOs {

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AmenityResRequest {
        @NotNull(message = "Booking ID is required")
        private Long bookingId;

        @NotNull(message = "Amenity ID is required")
        private Long amenityId;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AmenityResResponse {
        private Long id;
        private Long bookingId;
        private Long amenityId;
        private String amenityName;
        private LocalDate reservationDate;
        private ReservationStatus reservationStatus;
    }
}