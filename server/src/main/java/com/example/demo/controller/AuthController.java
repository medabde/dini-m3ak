package com.example.demo.controller;

import com.example.demo.utils.Constants;
import com.example.demo.exception.AuthException;
import com.example.demo.model.User;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("app/auth")
public class AuthController {

    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;

    @PostMapping("/login")
    public ResponseEntity<Map<String,String>> loginUser(@RequestBody Map<String, Object> userMap){
        String email = (String) userMap.get("email");
        String password = (String) userMap.get("password");
        int role = (int) userMap.get("role");

        User user;

        try{
            user = userRepository.findByEmailAndRole(email,roleRepository.getOne((long) role));
            if(user == null || !BCrypt.checkpw(password,user.getPassword())){
                throw new AuthException("Invalid email/password");
            }

        }catch (Exception e){
            throw new AuthException("Invalid email/password");
        }



        return new ResponseEntity<>(generateJWTToken(user), HttpStatus.OK);

    }

    @PostMapping("/register")
    public ResponseEntity<Map<String,String>> registerUser(@RequestBody Map<String,Object> userMap){
        String fName = (String) userMap.get("fname");
        String lName = (String) userMap.get("lname");
        String email = (String) userMap.get("email");
        String password = (String) userMap.get("password");
        int role = (int) userMap.get("role");

        Pattern pattern = Pattern.compile(Constants.EMAIL_FORMAT);
        if(email!=null) email = email.toLowerCase();
        if(!pattern.matcher(email).matches()){
            throw new AuthException("Invalid email format");
        }

        int count = userRepository.getCountByEmail(email);
        if (count>0) throw new AuthException("Email already in use");

        String cryptedPass = BCrypt.hashpw(password,BCrypt.gensalt(Constants.ROUNDS));

        User user = new User();
        user.setFirst_name(fName);
        user.setLast_name(lName);
        user.setEmail(email);
        user.setPassword(cryptedPass);
        user.setRole(roleRepository.getOne((long) role));

        user = userRepository.save(user);

        return new ResponseEntity<>(generateJWTToken(user), HttpStatus.OK);
    }



    private Map<String,String> generateJWTToken(User user){
        long timestamp = System.currentTimeMillis();
        String token = Jwts.builder().signWith(SignatureAlgorithm.HS256, Constants.API_SECRET_KEY)
                .setIssuedAt(new Date(timestamp))
                .setExpiration(new Date(timestamp+Constants.TOKEN_VALIDITY))
                .claim("userId",user.getId_user())
                .claim("email",user.getEmail())
                .claim("first_name",user.getFirst_name())
                .claim("last_name",user.getLast_name())
                .claim("is_enabled",user.isEnabled())
                .compact();
        Map<String,String> map = new HashMap<>();
        map.put("token",token);
        return map;
    }


}
