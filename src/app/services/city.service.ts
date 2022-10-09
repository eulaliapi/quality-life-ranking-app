import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

import { filter, forkJoin, map, Observable, of, switchMap} from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CityItem, Links, RootObject } from '../models/cityList.model';
import { CityUrbanArea, RootObject2 } from '../models/cityGeoIdInfo.model';
import { RootObject3, UaImages, UaScores } from '../models/urbanArea.model';
import { RootObject4, Image } from '../models/urbanAreaImages.model';
import { RootObject5 } from '../models/urbanAreaScores.model';


@Injectable({
  providedIn: 'root'
})

export class CityService {

  constructor(private http: HttpClient, private router: Router) { }

  //handles errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}.`);
      this.router.navigate(['/error']);
      return of(result as T);
    };
  }

  //gets the list of the id urls for each city that matches the query
  getCityList(encoded: string): Observable<Links["city:item"]["href"]> {
    return this.http.get<RootObject>(`https://api.teleport.org/api/cities/?search=${encoded}`)
    .pipe(
      map( object => object["_embedded"]["city:search-results"]),
      switchMap( objs => objs ),
      map( obj => obj["_links"]["city:item"]["href"]),
      catchError(this.handleError<Links["city:item"]["href"]>('getCityList', '')),
    );
  };

  //gets the urban area for each city and removes those the result of which is undefined
  getUAInfos(url: CityItem["href"]): Observable<[CityUrbanArea, number]> {
    let urbanArea = this.http.get<RootObject2>(url).pipe(
      map(obj => obj["_links"]["city:urban_area"]),
      filter(obj => obj !== undefined),
      catchError(this.handleError<CityUrbanArea>('getUrbanAreaObj')),
    )

    let id = this.http.get<RootObject2>(url).pipe(
      map(obj => obj["geoname_id"]),
      // catchError(this.handleError<number>('getId')),
    )

    return forkJoin([urbanArea, id])
  }

  //gets the urban area url from id
  getUrbanAreaUrl(id: number) : Observable<CityItem["href"]> {
    let url = `https://api.teleport.org/api/cities/geonameid:${id}/`;

    return this.getUAInfos(url).pipe(
      map(obj => obj[0]["href"]),
      catchError(this.handleError<CityItem["href"]>('getUrbanAreaUrl', '')),
    )

  };

  //gets urban area name, images and scores
  getUAUrlsDetails(url: CityItem["href"]): Observable<[RootObject3["full_name"],UaImages,UaScores]> {
    let name = this.http.get<RootObject3>(url).pipe(
      map(obj => obj["full_name"]),
      catchError(this.handleError<RootObject3["full_name"]>('getUAname', '')),
    )

    let images = this.http.get<RootObject3>(url).pipe(
      map(obj => obj["_links"]["ua:images"]),
      catchError(this.handleError<UaImages>('getUAImages')),
    );

    let scores = this.http.get<RootObject3>(url).pipe(
      map(obj => obj["_links"]["ua:scores"]),
      catchError(this.handleError<UaScores>('getUAScores')),
    );

    return forkJoin([name, images, scores])
  }

  //gets UA images
  getImages(url: UaImages["href"]): Observable<Image> {
    return this.http.get<RootObject4>(url).pipe(
      map(obj => obj["photos"][0]["image"]),
      catchError(this.handleError<Image>('getImages')),
    )
  }

  //gets UA teleport's city score, UA's teleport's city description and UA's scores
  getCityRankingDetails(url: UaScores["href"]): Observable<[RootObject5["teleport_city_score"], RootObject5["summary"], RootObject5["categories"]]> {
    let teleportCityScore = this.http.get<RootObject5>(url).pipe(
      map(obj => obj["teleport_city_score"]),
      catchError(this.handleError<RootObject5["teleport_city_score"]>('getTeleportScore', 0)),
    );

    let summary = this.http.get<RootObject5>(url).pipe(
      map(obj => obj["summary"]),
      catchError(this.handleError<RootObject5["summary"]>('getCitySummary', '')),
    );

    let categories = this.http.get<RootObject5>(url).pipe(
      map(obj => obj["categories"]),
      catchError(this.handleError<RootObject5["categories"]>('getScores', [])),
    );

    return forkJoin([teleportCityScore, summary, categories])
  }

}
