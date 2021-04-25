package com.example.demo.model;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "rides")
public class Ride {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id_ride;

    @ManyToOne
    @JoinColumn(name="motorist")
    private User user;

    @ManyToMany
    Set<User> passengers;

    @Column(name = "starting_date")
    private Date starting_date;

    @OneToOne(cascade = { CascadeType.MERGE, CascadeType.PERSIST })
    @JoinColumn(name = "starting_city", referencedColumnName = "id_city")
    private City starting_city;

    @Column(name = "destination_date")
    private Date destination_date;

    @OneToOne(cascade = { CascadeType.MERGE, CascadeType.PERSIST })
    @JoinColumn(name = "destination_city", referencedColumnName = "id_city")
    private City destination_city;

    @Column(name = "price")
    private double price;

    @Column(name = "seats")
    private int seats;

    @OneToOne(cascade = { CascadeType.MERGE, CascadeType.PERSIST })
    @JoinColumn(name = "ride_type", referencedColumnName = "id_type")
    private Type ride_type;

    @Column(name = "is_enabled")
    private boolean isEnabled;


    public long getId_ride() {
        return id_ride;
    }

    public void setId_ride(long id_ride) {
        this.id_ride = id_ride;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<User> getPassengers() {
        return passengers;
    }
    public int getNbPassengers(){
        if(passengers==null) return  0;
        return  passengers.size();
    }

    public String getMotorist(){
        return user.getFirst_name() +" "+ user.getLast_name();
    }
    public long motoristId(){
        return user.getId_user();
    }

    public String getStarting_city_name() {
        if(starting_city==null) return "";
        return starting_city.getCity_name();
    }

    public String getDestination_city_name() {
        if(destination_city==null) return "";
        return destination_city.getCity_name();
    }

    public String getRide_type_name(){
        if(ride_type==null) return "";
        return ride_type.getType();
    }


    public void setPassengers(Set<User> passengers) {
        this.passengers = passengers;
    }

    public Date getStarting_date() {
        return starting_date;
    }

    public void setStarting_date(Date starting_date) {
        this.starting_date = starting_date;
    }

    public City getStarting_city() {
        return starting_city;
    }

    public void setStarting_city(City starting_city) {
        this.starting_city = starting_city;
    }

    public Date getDestination_date() {
        return destination_date;
    }

    public void setDestination_date(Date destination_date) {
        this.destination_date = destination_date;
    }

    public City getDestination_city() {
        return destination_city;
    }

    public void setDestination_city(City destination_city) {
        this.destination_city = destination_city;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getSeats() {
        return seats;
    }

    public void setSeats(int seats) {
        this.seats = seats;
    }

    public Type getRide_type() {
        return ride_type;
    }

    public void setRide_type(Type ride_type) {
        this.ride_type = ride_type;
    }

    public boolean isEnabled() {
        return isEnabled;
    }

    public void setEnabled(boolean enabled) {
        isEnabled = enabled;
    }

    public Ride(User user, Set<User> passengers, Date starting_date, City starting_city, Date destination_date, City destination_city, double price, int seats, Type ride_type, boolean isEnabled) {
        this.user = user;
        this.passengers = passengers;
        this.starting_date = starting_date;
        this.starting_city = starting_city;
        this.destination_date = destination_date;
        this.destination_city = destination_city;
        this.price = price;
        this.seats = seats;
        this.ride_type = ride_type;
        this.isEnabled = isEnabled;
    }

    public Ride() {
    }
}
