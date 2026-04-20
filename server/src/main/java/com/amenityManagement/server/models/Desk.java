package com.amenityManagement.server.models;

import com.amenityManagement.server.enums.DeskStatus;
import com.amenityManagement.server.enums.DeskType;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "desks")
public class Desk {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workspace_id", nullable = false)
    private Workspace workspace;

    @Column(nullable = false)
    private Integer deskNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DeskType deskType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DeskStatus availabilityStatus;

    @CreationTimestamp
    private LocalDateTime createdAt;
}