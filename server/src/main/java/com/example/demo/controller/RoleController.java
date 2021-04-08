package com.example.demo.controller;


import com.example.demo.exception.AuthException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Role;
import com.example.demo.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("app/api/roles")
public class RoleController {

    @Autowired
    RoleRepository roleRepository;
    @GetMapping("/")
    public List<Role> getAllRoles(HttpServletRequest httpRequest){
        if (!((Boolean) httpRequest.getAttribute("is_admin"))) throw new AuthException("you don't have the right to access to this information");


        return roleRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Role> getRoleById(@PathVariable long id, HttpServletRequest httpRequest){
        if (!((Boolean) httpRequest.getAttribute("is_admin"))) throw new AuthException("you don't have the right to access to this information");

        Role role = roleRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("no role with id :" +id ));
        return ResponseEntity.ok(role);
    }

    @PutMapping("/{id}")
    public  ResponseEntity<Role> updateRole(@PathVariable Long id, @RequestBody Role roleDetails, HttpServletRequest httpRequest){
        if (!((Boolean) httpRequest.getAttribute("is_admin"))) throw new AuthException("you don't have the right to access to this information");

        Role role = roleRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("no role with id :" +id ));
        role.setRole(roleDetails.getRole());

        Role updateRole = roleRepository.save(role);
        return ResponseEntity.ok(updateRole);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteRole(@PathVariable Long id, HttpServletRequest httpRequest){
        if (!((Boolean) httpRequest.getAttribute("is_admin"))) throw new AuthException("you don't have the right to access to this information");


        Role role = roleRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("no role with id :" +id));
        roleRepository.delete(role);
        Map<String, Boolean> response = new HashMap<>();
        response.put("role deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);

    }
}
