package com.example.demo.model;

import javax.persistence.*;

@Entity
@Table(name="vehicles")
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id_vehicle;

    @Column(name = "name")
    private String name;

    @Column(name = "model")
    private String model;

    @Column(name = "description")
    private String description;

    @Column(name = "matriculation_number")
    private String matriculation_number;

    @ManyToOne
    @JoinColumn(name="id_user")
    private User user;

    public long getId_vehicle() {
        return id_vehicle;
    }

    public void setId_vehicle(long id_vehicle) {
        this.id_vehicle = id_vehicle;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMatriculation_number() {
        return matriculation_number;
    }

    public void setMatriculation_number(String matriculation_number) {
        this.matriculation_number = matriculation_number;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Vehicle(String name, String model, String description, String matriculation_number, User user) {
        this.name = name;
        this.model = model;
        this.description = description;
        this.matriculation_number = matriculation_number;
        this.user = user;
    }

    public Vehicle() {
    }
}
