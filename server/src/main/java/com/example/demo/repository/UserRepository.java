package com.example.demo.repository;

import com.example.demo.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.model.User;
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u WHERE u.email = ?1 AND u.role = ?2")
    User findByEmailAndRole(String email, Role role);

    @Query("SELECT count(*) FROM User u WHERE u.email = ?1")
    int getCountByEmail(String email);
}