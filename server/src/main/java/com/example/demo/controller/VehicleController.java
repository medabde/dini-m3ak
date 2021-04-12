package com.example.demo.controller;

import com.example.demo.exception.AuthException;
import com.example.demo.model.Ride;
import com.example.demo.model.Vehicle;
import com.example.demo.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("app/api/vehicles")
public class VehicleController {
    @Autowired
    VehicleRepository vehicleRepository;

    @GetMapping("/")
    public List<Vehicle> getAllVehicles(HttpServletRequest httpRequest){
        return vehicleRepository.findAll();
    }

}
