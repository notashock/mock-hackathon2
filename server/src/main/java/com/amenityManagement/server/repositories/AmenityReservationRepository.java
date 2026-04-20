package com.amenityManagement.server.repositories;

import com.amenityManagement.server.dtos.AnalyticsDTOs;
import com.amenityManagement.server.models.AmenityReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AmenityReservationRepository extends JpaRepository<AmenityReservation, Long> {
    List<AmenityReservation> findByBookingId(Long bookingId);
    @Query("SELECT a.id as amenityId, a.amenityName as amenityName, COUNT(ar.id) as totalReservations " +
            "FROM AmenityReservation ar JOIN ar.amenity a GROUP BY a.id, a.amenityName ORDER BY COUNT(ar.id) DESC")
    List<AnalyticsDTOs.AmenityUsageStat> getAmenityUsageStats();
}