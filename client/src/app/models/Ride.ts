import decode from 'jwt-decode';
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
    ride_type_name:string;
    destination_date:Date;
    destination_city_name:string;
    nbPassengers:number;
    enabled:boolean;
    isUserJoined:boolean;

    constructor(){
        this.nbPassengers=0;
        this.passengers = [];
        this.motorist = "";
        this.motorist = "";
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
    }

}