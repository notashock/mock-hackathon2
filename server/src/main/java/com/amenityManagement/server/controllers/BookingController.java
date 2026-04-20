package com.amenityManagement.server.controllers;

import com.amenityManagement.server.dtos.BookingDTOs.BookingRequest;
import com.amenityManagement.server.dtos.BookingDTOs.BookingResponse;
import com.amenityManagement.server.enums.BookingStatus;
import com.amenityManagement.server.services.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    @PreAuthorize("hasRole('MEMBER')")
    public ResponseEntity<BookingResponse> createBooking(
            @Valid @RequestBody BookingRequest request,
            Principal principal
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(bookingService.createBooking(request, principal.getName()));
    }

    @PutMapping("/{id}/confirm")
    @PreAuthorize("hasAnyRole('SPACE_MANAGER', 'ADMIN')")
    public ResponseEntity<BookingResponse> confirmBooking(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.updateBookingStatus(id, BookingStatus.CONFIRMED));
    }

    @PutMapping("/{id}/cancel")
    @PreAuthorize("hasAnyRole('MEMBER', 'SPACE_MANAGER', 'ADMIN')")
    public ResponseEntity<BookingResponse> cancelBooking(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.updateBookingStatus(id, BookingStatus.CANCELLED));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('SPACE_MANAGER', 'ADMIN')")
    public ResponseEntity<List<BookingResponse>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @GetMapping("/my-bookings")
    @PreAuthorize("hasRole('MEMBER')")
    public ResponseEntity<List<BookingResponse>> getMyBookings(Principal principal) {
        return ResponseEntity.ok(bookingService.getUserBookings(principal.getName()));
    }
}