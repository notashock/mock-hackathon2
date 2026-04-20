package com.amenityManagement.server.dtos;

import com.amenityManagement.server.enums.WorkspaceStatus;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class WorkspaceDTOs {

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class WorkspaceRequest {
        @NotBlank(message = "Workspace name required")
        private String workspaceName;

        @NotBlank(message = "Location required")
        private String location;

        @NotNull(message = "Total desks required")
        @Min(value = 1, message = "Workspace must have at least 1 desk")
        private Integer totalDesks;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class WorkspaceResponse {
        private Long id;
        private String workspaceName;
        private String location;
        private Integer totalDesks;
        private Integer availableDesks;
        private WorkspaceStatus status;
        private Long createdById;
        private String createdByName;
        private LocalDateTime createdAt;
    }
}