import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { RootObject3, UaImages, UaScores } from 'src/app/models/urbanArea.model';
import { Image } from 'src/app/models/urbanAreaImages.model';
import { Category, RootObject5 } from 'src/app/models/urbanAreaScores.model';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-city-ranking',
  templateUrl: './city-ranking.component.html',
  styleUrls: ['./city-ranking.component.css']
})
export class CityRankingComponent implements OnInit {

  cityName: RootObject3["full_name"] = "";
  cityBg!: Image;
  teleportCityScore?: string;
  citySummary?: string;
  cityScores?: Category[];
  Math = Math;
  bgImage: Record<string, string> = {};

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private cityService: CityService
  ) { }

  ngOnInit(): void {
    this.getUAUrls();
  }

  //goes back to the page that was desplayed before
  goBack() {
    this.location.back();
  }

  //gets the url from the id and then sends the object with other infos to getUADetails()
  getUAUrls() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cityService.getUrbanAreaUrl(id)
    .subscribe(url => this.cityService.getUAUrlsDetails(url).subscribe(obj => this.getUADetails(obj)));
  };

  //gets UA name, images object and teleport's city scores object
  getUADetails(obj: [RootObject3["full_name"], UaImages, UaScores]) {
    this.cityName = obj[0]; //name of the city
    this.cityService.getImages(obj[1]["href"]).subscribe((imgs) => this.setBgImage(imgs));
    this.cityService.getCityRankingDetails(obj[2]["href"]).subscribe(obj => this.getUAScoresAndSummary(obj));
  };

  //adjusts teleport's city score, sets the city's summary and city's scores as values of citySummary and cityScores variables
  getUAScoresAndSummary(obj: [RootObject5["teleport_city_score"], RootObject5["summary"], RootObject5["categories"]]) {
    this.teleportCityScore = Number(obj[0]).toFixed(1);
    this.citySummary = obj[1];
    this.cityScores = obj[2];
  };

  //adjusts the backkground of the header's element
  setBgImage(imgs: Image) {
    this.bgImage = {
      'background': window.innerWidth < 576 ? `url(${imgs.mobile})` : `url(${imgs.web})`,
      'background-size': 'cover',
    };
  }

}
