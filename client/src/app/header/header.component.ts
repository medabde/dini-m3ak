import { Component, OnInit } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = 'appBootstrap';  
    
  model :any;  

  showNavigationArrows = false;
  showNavigationIndicators = false;
  images = [ "assets/image/Carpool.png", "https://www.2iibm-tech.fr/images/site-de-covoiturage-france-3.jpg","assets/image/Carpool.png"];

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }

  ngOnInit(): void {
  }

}
