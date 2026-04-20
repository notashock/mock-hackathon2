package com.amenityManagement.server.services;

import com.amenityManagement.server.dtos.BookingDTOs.BookingRequest;
import com.amenityManagement.server.dtos.BookingDTOs.BookingResponse;
import com.amenityManagement.server.enums.BookingStatus;
import com.amenityManagement.server.models.Booking;
import com.amenityManagement.server.models.Desk;
import com.amenityManagement.server.models.User;
import com.amenityManagement.server.repositories.BookingRepository;
import com.amenityManagement.server.repositories.DeskRepository;
import com.amenityManagement.server.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final DeskRepository deskRepository;
    private final UserRepository userRepository;

    public BookingResponse createBooking(BookingRequest request, String userEmail) {
        if (request.getStartTime().isAfter(request.getEndTime()) || request.getStartTime().isEqual(request.getEndTime())) {
            throw new IllegalArgumentException("End time must be strictly greater than start time");
        }

        long hours = Duration.between(request.getStartTime(), request.getEndTime()).toHours();
        if (hours < 1 || hours > 12) {
            throw new IllegalArgumentException("Booking duration must be between 1 and 12 hours");
        }

        if (bookingRepository.existsOverlappingBooking(request.getDeskId(), request.getBookingDate(), request.getStartTime(), request.getEndTime())) {
            throw new IllegalArgumentException("Desk is already booked for the requested time slot");
        }

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        Desk desk = deskRepository.findById(request.getDeskId())
                .orElseThrow(() -> new EntityNotFoundException("Desk not found"));

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setDesk(desk);
        booking.setBookingDate(request.getBookingDate());
        booking.setStartTime(request.getStartTime());
        booking.setEndTime(request.getEndTime());
        booking.setBookingStatus(BookingStatus.REQUESTED);

        Booking savedBooking = bookingRepository.save(booking);
        return mapToResponse(savedBooking);
    }

    public BookingResponse updateBookingStatus(Long bookingId, BookingStatus newStatus) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found"));

        if (booking.getBookingStatus() == BookingStatus.COMPLETED) {
            throw new IllegalArgumentException("Cannot modify a completed booking");
        }

        booking.setBookingStatus(newStatus);
        Booking updatedBooking = bookingRepository.save(booking);
        return mapToResponse(updatedBooking);
    }

    public List<BookingResponse> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<BookingResponse> getUserBookings(String email) {
        return bookingRepository.findByUserEmail(email).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private BookingResponse mapToResponse(Booking booking) {
        return BookingResponse.builder()
                .id(booking.getId())
                .userId(booking.getUser().getId())
                .userName(booking.getUser().getName())
                .deskId(booking.getDesk().getId())
                .deskNumber(booking.getDesk().getDeskNumber())
                .workspaceId(booking.getDesk().getWorkspace().getId())
                .bookingDate(booking.getBookingDate())
                .startTime(booking.getStartTime())
                .endTime(booking.getEndTime())
                .bookingStatus(booking.getBookingStatus())
                .build();
    }
}