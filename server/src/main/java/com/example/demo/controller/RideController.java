package com.example.demo.controller;

import com.example.demo.exception.AuthException;
import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Ride;
import com.example.demo.model.User;
import com.example.demo.repository.RideRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("app/api/rides")
public class RideController {

    @Autowired
    RideRepository rideRepository;
    @Autowired
    UserRepository userRepository;

    @GetMapping("/")
    public List<Ride> getAllRides(HttpServletRequest httpRequest){
        if (!((Boolean) httpRequest.getAttribute("is_admin"))) throw new AuthException("you don't have the right to access to this information");


        return rideRepository.findAll();
    }

    @GetMapping("/enabled")
    public List<Ride> getAllEnabledRides(){
        return rideRepository.findEnabledRides();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ride> getRideById(@PathVariable long id, HttpServletRequest httpRequest){
        if (!((Boolean) httpRequest.getAttribute("is_admin"))) throw new AuthException("you don't have the right to access to this information");

        Ride ride = rideRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("no ride with id :" +id ));

        return ResponseEntity.ok(ride);
    }

    @PostMapping("/")
    public ResponseEntity<Ride> createRide(@RequestBody Ride rideDetails, HttpServletRequest httpRequest){
        long id = (Integer) httpRequest.getAttribute("userId");
        User user = userRepository.getOne(id);
        Ride ride = new Ride();

        ride.setUser(user);
        ride.setPrice(rideDetails.getPrice());
        ride.setSeats(rideDetails.getSeats());
        ride  = rideRepository.save(ride);

        return ResponseEntity.ok(ride);

    }

    @PutMapping("/joinride/{id}")
    public ResponseEntity<Ride> joinRide(@PathVariable Long id,HttpServletRequest httpRequest){
//        if (!((Boolean) httpRequest.getAttribute("is_admin"))) throw new AuthException("you don't have the right to access to this information");

        long idUser = (Integer) httpRequest.getAttribute("userId");
        User user = userRepository.getOne(idUser);

        Ride ride = rideRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("no city with id :" +id ));
        if(ride.getPassengers().size() == ride.getSeats()) throw new BadRequestException("the Ride is full");

        ride.getPassengers().add(user);

        ride  = rideRepository.save(ride);
        return ResponseEntity.ok(ride);
    }

    @PutMapping("/unjoinride/{id}")
    public ResponseEntity<Ride> unjoinRide(@PathVariable Long id,HttpServletRequest httpRequest){
//        if (!((Boolean) httpRequest.getAttribute("is_admin"))) throw new AuthException("you don't have the right to access to this information");

        long idUser = (Integer) httpRequest.getAttribute("userId");
        User user = userRepository.getOne(idUser);

        Ride ride = rideRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("no city with id :" +id ));
        ride.getPassengers().remove(user);

        ride  = rideRepository.save(ride);
        return ResponseEntity.ok(ride);
    }

    @PutMapping("/{id}")
    public  ResponseEntity<Ride> updateRide(@PathVariable Long id, @RequestBody Ride rideDetails, HttpServletRequest httpRequest){
        if (!((Boolean) httpRequest.getAttribute("is_admin"))) throw new AuthException("you don't have the right to access to this information");

        Ride ride = rideRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("no city with id :" +id ));

        ride.setPassengers(rideDetails.getPassengers());
        ride.setStarting_date(rideDetails.getStarting_date());
        ride.setStarting_city(rideDetails.getStarting_city());
        ride.setDestination_date(rideDetails.getDestination_date());
        ride.setDestination_city(rideDetails.getDestination_city());
        ride.setPrice(rideDetails.getPrice());
        ride.setSeats(rideDetails.getSeats());
        ride.setRide_type(rideDetails.getRide_type());
        ride.setEnabled(rideDetails.isEnabled());
        Ride updateRide = rideRepository.save(ride);
        return ResponseEntity.ok(updateRide);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> DeleteRide(@PathVariable Long id, HttpServletRequest httpRequest){
        if (!((Boolean) httpRequest.getAttribute("is_admin"))) throw new AuthException("you don't have the right to access to this information");


        Ride ride = rideRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("no ride with id :" +id));
        rideRepository.delete(ride);
        Map<String, Boolean> response = new HashMap<>();
        response.put("ride deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);

    }




}
