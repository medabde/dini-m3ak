package com.example.demo.repository;

import com.example.demo.model.Ride;
import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface RideRepository extends JpaRepository<Ride, Long> {
    @Query("SELECT r FROM Ride r WHERE r.isEnabled = true")
    List<Ride> findEnabledRides();

    @Query("SELECT r FROM Ride r WHERE r.user = ?1 AND r.isEnabled = true")
    List<Ride> findEnabledRidesByUser(User user);

    @Query("SELECT r FROM Ride r WHERE ?1 member r.passengers")
    List<Ride> findJoinedRidesByUser(User user);

    @Query("SELECT r FROM Ride r WHERE r.user = ?1 AND r.isEnabled = false")
    List<Ride> findDisabledRidesByUser(User user);
}
