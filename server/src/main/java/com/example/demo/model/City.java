package com.example.demo.model;


import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "cities")
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id_city;

    @Column(name = "city_name")
    private String city_name;

    public long getId_city() {
        return id_city;
    }

    public void setId_city(long id_city) {
        this.id_city = id_city;
    }

    public String getCity_name() {
        return city_name;
    }

    public void setCity_name(String city_name) {
        this.city_name = city_name;
    }

    public City(String city_name) {
        this.city_name = city_name;
    }

    public City() {
        super();
    }
}
