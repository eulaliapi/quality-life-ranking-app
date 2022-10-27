import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CityService } from 'src/app/services/city.service';

import { RootObject2 } from 'src/app/models/cityGeoIdInfo.model';


@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.css']
})
export class ContentPageComponent implements OnInit, OnChanges {
   
  //input property
  @Input() requestedCity?: string;

  showCityList: boolean = true;
  cityList: RootObject2[] = [];

  constructor(private cityService: CityService) { }

  ngOnInit(): void {};

  //when city is entered getCitySearchRes is fired 
  ngOnChanges(): void {
    if (this.requestedCity) {
      this.getCitySearchRes();
    }
  }

  //encodes the string and gets the list of those cities that match the query
  getCitySearchRes() {
    if (this.requestedCity) {
      let encoded = encodeURIComponent(this.requestedCity);
      this.cityService.getCitySearchArr(encoded).subscribe(arr => {
        this.cityList = arr;
        this.cityList.length > 0 ? this.showCityList = true : this.showCityList = false;
      });
    };
    
  };

}
