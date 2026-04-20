package com.amenityManagement.server.repositories;

import com.amenityManagement.server.models.Desk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeskRepository extends JpaRepository<Desk, Long> {
    List<Desk> findByWorkspaceId(Long workspaceId);
}