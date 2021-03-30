package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.model.User;
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u WHERE u.email = ?1 AND u.password = ?2 AND u.role = ?3")
    User findByEmailAndPassword(String email,String pass, int role);

    @Query("COUNT * FROM User u WHERE u.email = ?1")
    int getCountByEmail(String email);
}