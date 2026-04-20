package com.amenityManagement.server.controllers;

import com.amenityManagement.server.dtos.AnalyticsDTOs.AmenityUsageStat;
import com.amenityManagement.server.dtos.AnalyticsDTOs.DeskUtilizationStat;
import com.amenityManagement.server.dtos.AnalyticsDTOs.WorkspaceBookingStat;
import com.amenityManagement.server.services.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/workspaces/bookings")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<WorkspaceBookingStat>> getWorkspaceBookingStats() {
        return ResponseEntity.ok(analyticsService.getWorkspaceBookingStats());
    }

    @GetMapping("/amenities/usage")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<AmenityUsageStat>> getAmenityUsageStats() {
        return ResponseEntity.ok(analyticsService.getAmenityUsageStats());
    }

    @GetMapping("/desks/utilization")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<DeskUtilizationStat>> getDeskUtilizationStats() {
        return ResponseEntity.ok(analyticsService.getDeskUtilizationStats());
    }
}