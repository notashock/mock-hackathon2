package com.amenityManagement.server.services;

import com.amenityManagement.server.dtos.AmenityResDTOs.AmenityResRequest;
import com.amenityManagement.server.dtos.AmenityResDTOs.AmenityResResponse;
import com.amenityManagement.server.enums.AmenityStatus;
import com.amenityManagement.server.enums.ReservationStatus;
import com.amenityManagement.server.models.Amenity;
import com.amenityManagement.server.models.AmenityReservation;
import com.amenityManagement.server.models.Booking;
import com.amenityManagement.server.repositories.AmenityRepository;
import com.amenityManagement.server.repositories.AmenityReservationRepository;
import com.amenityManagement.server.repositories.BookingRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AmenityReservationService {

    private final AmenityReservationRepository amenityReservationRepository;
    private final BookingRepository bookingRepository;
    private final AmenityRepository amenityRepository;

    public AmenityResResponse requestAmenity(AmenityResRequest request) {
        Booking booking = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() -> new EntityNotFoundException("Booking not found"));

        Amenity amenity = amenityRepository.findById(request.getAmenityId())
                .orElseThrow(() -> new EntityNotFoundException("Amenity not found"));

        if (amenity.getAvailabilityStatus() != AmenityStatus.AVAILABLE) {
            throw new IllegalArgumentException("Amenity is not currently available for reservation");
        }

        AmenityReservation reservation = new AmenityReservation();
        reservation.setBooking(booking);
        reservation.setAmenity(amenity);
        reservation.setReservationDate(booking.getBookingDate());
        reservation.setReservationStatus(ReservationStatus.REQUESTED);

        AmenityReservation savedReservation = amenityReservationRepository.save(reservation);
        return mapToResponse(savedReservation);
    }

    public AmenityResResponse updateReservationStatus(Long reservationId, ReservationStatus newStatus) {
        AmenityReservation reservation = amenityReservationRepository.findById(reservationId)
                .orElseThrow(() -> new EntityNotFoundException("Reservation not found"));

        reservation.setReservationStatus(newStatus);
        AmenityReservation updatedReservation = amenityReservationRepository.save(reservation);
        return mapToResponse(updatedReservation);
    }

    public List<AmenityResResponse> getAllReservations() {
        return amenityReservationRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private AmenityResResponse mapToResponse(AmenityReservation reservation) {
        return AmenityResResponse.builder()
                .id(reservation.getId())
                .bookingId(reservation.getBooking().getId())
                .amenityId(reservation.getAmenity().getId())
                .amenityName(reservation.getAmenity().getAmenityName())
                .reservationDate(reservation.getReservationDate())
                .reservationStatus(reservation.getReservationStatus())
                .build();
    }
}