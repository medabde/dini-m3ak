package com.example.demo.controller;


import com.example.demo.exception.AuthException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.City;
import com.example.demo.model.Type;
import com.example.demo.repository.TypeRepository;
import com.example.demo.utils.Constants;
import com.example.demo.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("app/api/types")
public class TypeController {
    @Autowired
    TypeRepository typeRepository;
    @Autowired
    Utils utils;

    @GetMapping("/")
    public List<Type> getAllTypes(HttpServletRequest httpRequest){
        int id = (int) httpRequest.getAttribute("userId");
        if (!utils.checkRole(id, Constants.ADMIN_ROLE)) throw new AuthException("you don't have the right to access to this information");


        return typeRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Type> getTypeById(@PathVariable long id, HttpServletRequest httpRequest){
        int userId = (int) httpRequest.getAttribute("userId");
        if (!utils.checkRole(userId, Constants.ADMIN_ROLE)) throw new AuthException("you don't have the right to access to this information");

        Type type = typeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("no type with id :" +id ));
        return ResponseEntity.ok(type);
    }

    @PutMapping("/{id}")
    public  ResponseEntity<Type> updateType(@PathVariable Long id, @RequestBody Type typeDetails,HttpServletRequest httpRequest){
        int userId = (int) httpRequest.getAttribute("userId");
        if (!utils.checkRole(userId, Constants.ADMIN_ROLE)) throw new AuthException("you don't have the right to access to this information");

        Type type = typeRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("no type with id :" +id ));
        type.setType(typeDetails.getType());
        Type updateType = typeRepository.save(type);
        return ResponseEntity.ok(updateType);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> DeleteType(@PathVariable Long id, HttpServletRequest httpRequest){
        int userId = (int) httpRequest.getAttribute("userId");
        if (!utils.checkRole(userId, Constants.ADMIN_ROLE)) throw new AuthException("you don't have the right to access to this information");


        Type type = typeRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("no type with id :" +id));
        typeRepository.delete(type);
        Map<String, Boolean> response = new HashMap<>();
        response.put("type deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);

    }



}
