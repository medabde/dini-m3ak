import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

  public canvas : any;
  public ctx;
  public ctx1;
  public chartColor;
  public chartEmail;
  public chartHours;
  

    ngOnInit(){
      this.chartColor = "#FFFFFF";
      this.canvas = document.getElementById("chartEmail");
      this.ctx = this.canvas.getContext("2d");
      this.chartEmail = new Chart(this.ctx, {
        type: 'pie',
        data: {
          labels: [1, 2],
          datasets: [{
            label: "Rides",
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: [
              '#e3e3e3',
              '#4acccd',
              '#fcc468',
            ],
            borderWidth: 0,
            data: [342, 480, 530]
          }]
        },

        options: {

          legend: {
            display: false
          },

         

          tooltips: {
            enabled: false
          },

          scales: {
            yAxes: [{

              ticks: {
                display: false
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "transparent",
                color: 'rgba(255,255,255,0.05)'
              }

            }],

          
          },
        }
      });

     }
}
