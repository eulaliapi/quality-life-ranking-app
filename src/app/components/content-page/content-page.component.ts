import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CityService } from 'src/app/services/city.service';

import { CityUrbanArea } from 'src/app/models/cityGeoIdInfo.model';


@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.css']
})
export class ContentPageComponent implements OnInit, OnChanges {

  //input property
  @Input() requestedCity?: string;

  //checks if cityList is empty
  fullList: boolean = false;
  showMsg: boolean = false;
  availableUAs: [CityUrbanArea, number][] = [];
  filteredCityList: [CityUrbanArea, number][] = [];

  constructor(private cityService: CityService) { }

  ngOnInit(): void { };

  //when city is entered getCityList is fired 
  ngOnChanges(): void {
    this.fullList = true;
    if (this.requestedCity) {
      this.getCityList();
    }
  }

  //encodes the string and gets the list of cities that match the query
  getCityList() {
    this.availableUAs = [];
    if (this.requestedCity) {
      let encoded = encodeURIComponent(this.requestedCity);
      this.cityService.getCityList(encoded).subscribe((url) => this.cityService.getUAInfos(url).subscribe((ua) => this.availableUAs.push(ua)))};
    //this way I can get the last array with the right index
    setTimeout(() => {
      this.showChildComponent()
    }, 1000)
  };

  //shows info-message or city-list according to availableUAs.length
  showChildComponent() {
    if (this.availableUAs.length > 0) {
      this.fullList = true;
      this.showMsg = true;
    } else {
      this.fullList = false;
      this.showMsg = false;
    }
    this.collectUniqueUAs();
  };

  //obtains the list with the cities that are UAs without duplicates
  collectUniqueUAs() {
    const uniqueHrefs: CityUrbanArea["href"][] = [];
    const UniqueUAs = this.availableUAs.filter(obj => {
      const isDuplicate = uniqueHrefs.includes(obj[0]["href"]);

      if (!isDuplicate) {
        uniqueHrefs.push(obj[0]["href"]);
        return true;
      }
      return false;
    });
    this.filteredCityList = UniqueUAs;
  };


}
