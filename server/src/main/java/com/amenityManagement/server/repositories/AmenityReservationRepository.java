package com.amenityManagement.server.repositories;

import com.amenityManagement.server.models.AmenityReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AmenityReservationRepository extends JpaRepository<AmenityReservation, Long> {
    List<AmenityReservation> findByBookingId(Long bookingId);
}