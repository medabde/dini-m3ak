package com.example.demo.utils;

import com.example.demo.model.User;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Utils {

    @Autowired
    private UserRepository userRepository;

    public boolean checkRole(long userId, String role){
        User user = userRepository.getOne(userId);
        return user.getRole().getRole().equals(role);
    }



}
