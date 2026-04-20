package com.amenityManagement.server.repositories;

import com.amenityManagement.server.dtos.AnalyticsDTOs;
import com.amenityManagement.server.enums.BookingStatus;
import com.amenityManagement.server.models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserEmail(String email);

    @Query("SELECT COUNT(b) > 0 FROM Booking b WHERE b.desk.id = :deskId " +
            "AND b.bookingDate = :bookingDate " +
            "AND b.bookingStatus NOT IN ('CANCELLED', 'COMPLETED') " +
            "AND (b.startTime < :endTime AND b.endTime > :startTime)")
    boolean existsOverlappingBooking(@Param("deskId") Long deskId,
                                     @Param("bookingDate") LocalDate bookingDate,
                                     @Param("startTime") LocalDateTime startTime,
                                     @Param("endTime") LocalDateTime endTime);

    @Query("SELECT d.workspace.id as workspaceId, d.workspace.workspaceName as workspaceName, COUNT(b.id) as totalBookings " +
            "FROM Booking b JOIN b.desk d GROUP BY d.workspace.id, d.workspace.workspaceName")
    List<AnalyticsDTOs.WorkspaceBookingStat> getTotalBookingsPerWorkspace();

    @Query("SELECT COUNT(DISTINCT b.desk.id) FROM Booking b WHERE b.desk.workspace.id = :workspaceId")
    Long countUniqueDesksBookedByWorkspace(@Param("workspaceId") Long workspaceId);
}