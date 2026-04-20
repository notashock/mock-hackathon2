package com.amenityManagement.server.dtos;

import com.amenityManagement.server.enums.DeskStatus;
import com.amenityManagement.server.enums.DeskType;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class DeskDTOs {

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class DeskRequest {
        @NotNull(message = "Workspace ID is required")
        private Long workspaceId;

        @NotNull(message = "Desk number is required")
        private Integer deskNumber;

        @NotNull(message = "Desk type is required")
        private DeskType deskType;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class DeskResponse {
        private Long id;
        private Long workspaceId;
        private String workspaceName;
        private Integer deskNumber;
        private DeskType deskType;
        private DeskStatus availabilityStatus;
        private LocalDateTime createdAt;
    }
}