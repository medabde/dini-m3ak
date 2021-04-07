package com.example.demo.controller;

import com.example.demo.exception.AuthException;
import com.example.demo.model.Ride;
import com.example.demo.repository.RideRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("app/api/rides")
public class RideController {

    @Autowired
    RideRepository rideRepository;

    @GetMapping("/")
    public List<Ride> getAllRides(HttpServletRequest httpRequest){
        if (!((Boolean) httpRequest.getAttribute("is_admin"))) throw new AuthException("you don't have the right to access to this information");


        return rideRepository.findAll();
    }

    @GetMapping("/enabled")
    public List<Ride> getAllEnabledRides(){
        return rideRepository.findEnabledRies();
    }





}
