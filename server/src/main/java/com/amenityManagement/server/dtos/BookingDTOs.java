package com.amenityManagement.server.dtos;

import com.amenityManagement.server.enums.BookingStatus;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class BookingDTOs {

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BookingRequest {
        @NotNull(message = "Desk ID is required")
        private Long deskId;

        @NotNull(message = "Booking date is required")
        @FutureOrPresent(message = "Booking date must be today or in the future")
        private LocalDate bookingDate;

        @NotNull(message = "Start time is required")
        private LocalDateTime startTime;

        @NotNull(message = "End time is required")
        private LocalDateTime endTime;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BookingResponse {
        private Long id;
        private Long userId;
        private String userName;
        private Long deskId;
        private Integer deskNumber;
        private Long workspaceId;
        private LocalDate bookingDate;
        private LocalDateTime startTime;
        private LocalDateTime endTime;
        private BookingStatus bookingStatus;
    }
}