package com.example.demo.repository;

import com.example.demo.model.Ride;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RideRepository extends JpaRepository<Ride, Long> {
    @Query("SELECT r FROM Ride r WHERE r.isEnabled = true")
    List<Ride> findEnabledRies();
}
