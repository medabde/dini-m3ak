package com.example.demo.utils;

import com.example.demo.model.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

public class Utils {
    public static Map<String,String> generateJWTToken(User user){
        long timestamp = System.currentTimeMillis();
        String token = Jwts.builder().signWith(SignatureAlgorithm.HS256, Constants.API_SECRET_KEY)
                .setIssuedAt(new Date(timestamp))
                .setExpiration(new Date(timestamp+ Constants.TOKEN_VALIDITY))
                .claim("userId",user.getId_user())
                .claim("email",user.getEmail())
                .claim("first_name",user.getFirst_name())
                .claim("last_name",user.getLast_name())
                .claim("cin",user.getCIN())
                .claim("address",user.getAddress())
                .claim("phone",user.getPhone())
                .claim("is_enabled",user.isEnabled())
                .claim("is_admin",user.getRole().getRole().equals(Constants.ADMIN_ROLE))
                .compact();
        Map<String,String> map = new HashMap<>();
        map.put("token",token);
        return map;
    }
}
