package com.example.demo.repository;

import com.example.demo.model.City;
import com.example.demo.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City, Long> {
}
