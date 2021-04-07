package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.demo.exception.AuthException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

import javax.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("app/api/users")
public class UserController {


    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;


    @GetMapping("/")
    public List<User> getAllUsers(HttpServletRequest httpRequest){
        if (!((Boolean) httpRequest.getAttribute("is_admin"))) throw new AuthException("you don't have the right to access to this information");

        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable long id,HttpServletRequest httpRequest){
        if (!((Boolean) httpRequest.getAttribute("is_admin"))) throw new AuthException("you don't have the right to access to this information");


        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("no user with id :" +id ));
        return ResponseEntity.ok(user);
    }

    @PutMapping("/{id}")
    public  ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails,HttpServletRequest httpRequest){
        if (!((Boolean) httpRequest.getAttribute("is_admin"))) throw new AuthException("you don't have the right to access to this information");


        User user = userRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("no user with id :" +id ));
//        user.setNom(userDetails.getNom());
//        user.setPrenom(userDetails.getPrenom());
//        user.setEmail(userDetails.getEmail());
        User updateUser = userRepository.save(user);
        return ResponseEntity.ok(updateUser);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> DeleteUser(@PathVariable Long id,HttpServletRequest httpRequest){
        if (!((Boolean) httpRequest.getAttribute("is_admin"))) throw new AuthException("you don't have the right to access to this information");

        User user = userRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("no user with id :" +id));
        userRepository.delete(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("user deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);

    }
}
