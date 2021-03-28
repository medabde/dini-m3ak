package com.example.demo.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.demo.Constants;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Role;
import com.example.demo.repository.RoleRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/")
public class UserController {


    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;


    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }
    @PostMapping("/users")
    public User createUser(@RequestBody Map<String,Object> userMap){
        String first_name = (String) userMap.get("first_name");
        String last_name = (String) userMap.get("last_name");
        String email = (String) userMap.get("email");
        long roleId = (Integer) userMap.get("role");
        Role role = roleRepository.getOne(roleId);

        User user = new User();
        user.setFirst_name(first_name);
        user.setLast_name(last_name);
        user.setEmail(email);
        user.setRole(role);

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
//        user.setNom(userDetails.getNom());
//        user.setPrenom(userDetails.getPrenom());
//        user.setEmail(userDetails.getEmail());
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

    private Map<String,String> generateJWTToken(User user){
        long timestamp = System.currentTimeMillis();
        String token = Jwts.builder().signWith(SignatureAlgorithm.HS256, Constants.API_SECRET_KEY)
                .setIssuedAt(new Date(timestamp))
                .setExpiration(new Date(timestamp+Constants.TOKEN_VALIDITY))
//                .claim("userId",user.getId())
//                .claim("email",user.getEmail())
//                .claim("firstname",user.getfName())
//                .claim("lastname",user.getlName())
                .compact();
        Map<String,String> map = new HashMap<>();
        map.put("token",token);
        return map;
    }
}
