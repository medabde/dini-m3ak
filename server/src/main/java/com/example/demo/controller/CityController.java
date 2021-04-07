package com.example.demo.controller;

import com.example.demo.exception.AuthException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.City;
import com.example.demo.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("app/api/cities")
public class CityController {

    @Autowired
    CityRepository cityRepository;

    @GetMapping("/")
    public List<City> getAllCities(HttpServletRequest httpRequest){
        if (!((Boolean) httpRequest.getAttribute("is_admin"))) throw new AuthException("you don't have the right to access to this information");


        return cityRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<City> getCityById(@PathVariable long id,HttpServletRequest httpRequest){
        if (!((Boolean) httpRequest.getAttribute("is_admin"))) throw new AuthException("you don't have the right to access to this information");

        City city = cityRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("no city with id :" +id ));
        return ResponseEntity.ok(city);
    }

    @PutMapping("/{id}")
    public  ResponseEntity<City> updateCity(@PathVariable Long id, @RequestBody City cityDetails,HttpServletRequest httpRequest){
        if (!((Boolean) httpRequest.getAttribute("is_admin"))) throw new AuthException("you don't have the right to access to this information");

        City city = cityRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("no city with id :" +id ));
        city.setCity_name(cityDetails.getCity_name());
        City updateCity = cityRepository.save(city);
        return ResponseEntity.ok(updateCity);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> DeleteCity(@PathVariable Long id,HttpServletRequest httpRequest){
        if (!((Boolean) httpRequest.getAttribute("is_admin"))) throw new AuthException("you don't have the right to access to this information");


        City city = cityRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("no city with id :" +id));
        cityRepository.delete(city);
        Map<String, Boolean> response = new HashMap<>();
        response.put("city deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);

    }

}
