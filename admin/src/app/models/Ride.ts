import decode from 'jwt-decode';
import { City } from './City';
import { RideType } from './RideType';
import { User } from './User';

export class Ride {
    id_ride?:number;
    motorist:string;
    seats:number;
    motoristId:number;
    user:User;
    passengers:User[];
    starting_date:Date;
    starting_city_name:string;
    starting_city:City;
    destination_city:City;
    ride_type_name:string;
    ride_type:RideType;
    destination_date:Date;
    destination_city_name:string;
    nbPassengers:number;
    enabled:boolean;
    isUserJoined:boolean;
    price:number;

    constructor(){
        this.nbPassengers=0;
        this.passengers = [];
        this.motorist = "";
        this.motorist = "";
        this.starting_city=new City();
        this.destination_city=new City();
        this.ride_type=new RideType();
        this.seats = 0;
        this.starting_date = new Date();
        this.ride_type_name="";
        this.starting_city_name ="";
        this.destination_date = new Date();
        this.destination_city_name = "";
        this.motoristId = -1;
        this.enabled=false;
        this.isUserJoined =false;
        this.user=new User();
        this.price=0;
    }

}