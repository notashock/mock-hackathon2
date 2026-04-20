package com.amenityManagement.server.services;

import com.amenityManagement.server.dtos.AnalyticsDTOs.AmenityUsageStat;
import com.amenityManagement.server.dtos.AnalyticsDTOs.DeskUtilizationStat;
import com.amenityManagement.server.dtos.AnalyticsDTOs.WorkspaceBookingStat;
import com.amenityManagement.server.models.Workspace;
import com.amenityManagement.server.repositories.AmenityReservationRepository;
import com.amenityManagement.server.repositories.BookingRepository;
import com.amenityManagement.server.repositories.WorkspaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final BookingRepository bookingRepository;
    private final AmenityReservationRepository amenityReservationRepository;
    private final WorkspaceRepository workspaceRepository;

    public List<WorkspaceBookingStat> getWorkspaceBookingStats() {
        return bookingRepository.getTotalBookingsPerWorkspace();
    }

    public List<AmenityUsageStat> getAmenityUsageStats() {
        return amenityReservationRepository.getAmenityUsageStats();
    }

    public List<DeskUtilizationStat> getDeskUtilizationStats() {
        List<Workspace> workspaces = workspaceRepository.findAll();

        return workspaces.stream().map(workspace -> {
            Long uniqueDesksBooked = bookingRepository.countUniqueDesksBookedByWorkspace(workspace.getId());

            // Calculate percentage safely to avoid division by zero
            double percentage = 0.0;
            if (workspace.getTotalDesks() != null && workspace.getTotalDesks() > 0) {
                percentage = ((double) uniqueDesksBooked / workspace.getTotalDesks()) * 100;
            }

            // Round to 2 decimal places
            percentage = Math.round(percentage * 100.0) / 100.0;

            return DeskUtilizationStat.builder()
                    .workspaceId(workspace.getId())
                    .workspaceName(workspace.getWorkspaceName())
                    .totalDesks(workspace.getTotalDesks())
                    .uniqueDesksBooked(uniqueDesksBooked)
                    .utilizationPercentage(percentage)
                    .build();
        }).collect(Collectors.toList());
    }
}