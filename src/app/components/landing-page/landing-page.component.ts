import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  newRequestedCity: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  //gets the city entered by the user and sets it as "newRequestedCity" value
  getRequestedCity(enteredCity: string) {
    this.newRequestedCity = enteredCity;
  }

 
}
