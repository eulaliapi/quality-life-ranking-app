import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Image } from 'src/app/models/urbanAreaImages.model';
import { Category } from 'src/app/models/urbanAreaScores.model';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-city-ranking',
  templateUrl: './city-ranking.component.html',
  styleUrls: ['./city-ranking.component.css']
})
export class CityRankingComponent implements OnInit {

  city!: [string, Image, [string, number, Category[]]];
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

  getUAUrls() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cityService.getUrbanArea(id).subscribe(res => {
      this.city = res;
      this.setBgImage(res[1])}
    );
  };

  //adjusts the background of the header's element
  setBgImage(imgs: Image) {
    this.bgImage = {
      'background': window.innerWidth < 576 ? `url(${imgs.mobile})` : `url(${imgs.web})`,
      'background-size': 'cover',
    };
  };

  //adjusts scoreBarWidth based on screen size
  setScoreWidth(categoryScore: number) {
    let scoreBarWidth = {
      'width': window.innerWidth > 400 ? `${categoryScore.toFixed(1)}rem` : `${(categoryScore/2).toFixed(1)}rem`
    };
    return scoreBarWidth;
  };

}
