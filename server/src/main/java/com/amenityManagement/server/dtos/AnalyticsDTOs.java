package com.amenityManagement.server.dtos;

public class AnalyticsDTOs {

    public interface WorkspaceBookingStat {
        Long getWorkspaceId();
        String getWorkspaceName();
        Long getTotalBookings();
    }

    public interface AmenityUsageStat {
        Long getAmenityId();
        String getAmenityName();
        Long getTotalReservations();
    }

    // Standard DTO for the Service to calculate and return percentages
    @lombok.Data
    @lombok.Builder
    public static class DeskUtilizationStat {
        private Long workspaceId;
        private String workspaceName;
        private Integer totalDesks;
        private Long uniqueDesksBooked;
        private Double utilizationPercentage;
    }
}