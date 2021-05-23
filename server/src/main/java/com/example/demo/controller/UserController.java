package com.example.demo.controller;

import com.example.demo.exception.AuthException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.User;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public ResponseEntity<User> getUserById(@PathVariable long id, HttpServletRequest httpRequest){
        if (!((Boolean) httpRequest.getAttribute("is_admin"))) throw new AuthException("you don't have the right to access to this information");


        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("no user with id :" +id ));
        return ResponseEntity.ok(user);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateUser(@PathVariable long id, @RequestBody User userDetails, HttpServletRequest httpRequest){
        if (id != userDetails.getId_user() && !((Boolean) httpRequest.getAttribute("is_admin"))) throw new AuthException("you don't have the right to access to this information");

        User user = userRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("no user with id :" +id ));
        user.setFirst_name(userDetails.getFirst_name());
        user.setLast_name(userDetails.getLast_name());
        user.setEmail(userDetails.getEmail());
        user.setPhone(userDetails.getPhone());
        user.setAddress(userDetails.getAddress());
        user.setCIN(userDetails.getCIN());

        User updateUser = userRepository.save(user);
        return ResponseEntity.ok(updateUser);
    }
    @PutMapping("/")
    public ResponseEntity<Map<String,String>> updateProfile(@RequestBody User userDetails, HttpServletRequest httpRequest){
        long id = (Integer) httpRequest.getAttribute("userId");
        if (id != userDetails.getId_user() && !((Boolean) httpRequest.getAttribute("is_admin"))) throw new AuthException("you don't have the right to access to this information");

        User user = userRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("no user with id :" +id ));
        user.setFirst_name(userDetails.getFirst_name());
        user.setLast_name(userDetails.getLast_name());
        user.setEmail(userDetails.getEmail());
        user.setPhone(userDetails.getPhone());
        user.setAddress(userDetails.getAddress());
        user.setCIN(userDetails.getCIN());

        User updateProfile = userRepository.save(user);


        return new ResponseEntity<>(Utils.generateJWTToken(updateProfile), HttpStatus.OK);
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
