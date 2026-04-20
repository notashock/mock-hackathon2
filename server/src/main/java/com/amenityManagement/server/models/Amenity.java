package com.amenityManagement.server.models;

import com.amenityManagement.server.enums.AmenityStatus;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "amenities")
public class Amenity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String amenityName;

    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AmenityStatus availabilityStatus;

    @CreationTimestamp
    private LocalDateTime createdAt;
}