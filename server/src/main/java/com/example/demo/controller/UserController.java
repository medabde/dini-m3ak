package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.demo.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/app/")
public class UserController {


    @Autowired
    private UserRepository userRepository;
    @GetMapping("/users")
    public List<User> getAllEmployee(){
        return userRepository.findAll();
    }
    @PostMapping("/users")
    public User createUser(@RequestBody User user){
        return userRepository.save(user);
}
    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable long id){
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("no user with id :" +id ));
        return ResponseEntity.ok(user);
    }

    @PutMapping("/users/{id}")
    public  ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails){
        User user = userRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("no user with id :" +id ));
        user.setNom(userDetails.getNom());
        user.setPrenom(userDetails.getPrenom());
        user.setEmail(userDetails.getEmail());
        User updateUser = userRepository.save(user);
        return ResponseEntity.ok(updateUser);
    }
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String, Boolean>> DeleteUser(@PathVariable Long id){
        User user = userRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("no user with id :" +id));
        userRepository.delete(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("user deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);

    }
}
