package com.example.demo.controller;

import com.example.demo.exception.AuthException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.City;
import com.example.demo.model.Ride;
import com.example.demo.model.Vehicle;
import com.example.demo.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @GetMapping("/{id}")
    public ResponseEntity<Vehicle> getVehicleById(@PathVariable long id, HttpServletRequest httpRequest){
        if (!((Boolean) httpRequest.getAttribute("is_admin"))) throw new AuthException("you don't have the right to access to this information");

        Vehicle vehicle = vehicleRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("no Vehicle with id :" +id ));
        return ResponseEntity.ok(vehicle);
    }

    @PostMapping("/")
    public  ResponseEntity<Vehicle> createVehicle(@RequestBody Vehicle vehicleDetails, HttpServletRequest httpRequest){
        if (!((Boolean) httpRequest.getAttribute("is_admin"))) throw new AuthException("you don't have the right to access to this information");

        Vehicle vehicle = new Vehicle();
        vehicle.setName(vehicleDetails.getName());
        vehicle = vehicleRepository.save(vehicle);
        return ResponseEntity.ok(vehicle);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Vehicle> updateVehicle(@PathVariable Long id, @RequestBody Vehicle vehicleDetails, HttpServletRequest httpRequest){
        if (!((Boolean) httpRequest.getAttribute("is_admin"))) throw new AuthException("you don't have the right to access to this information");

        Vehicle vehicle = vehicleRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("no vehicle with id :" +id ));
        vehicle.setName(vehicleDetails.getName());
        Vehicle updateVehicle = vehicleRepository.save(vehicle);
        return ResponseEntity.ok(updateVehicle);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> DeleteVehicle(@PathVariable Long id, HttpServletRequest httpRequest){
        if (!((Boolean) httpRequest.getAttribute("is_admin"))) throw new AuthException("you don't have the right to access to this information");


        Vehicle vehicle = vehicleRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("no vehicle with id :" +id));
        vehicleRepository.delete(vehicle);
        Map<String, Boolean> response = new HashMap<>();
        response.put("vehicle deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);

    }

}
