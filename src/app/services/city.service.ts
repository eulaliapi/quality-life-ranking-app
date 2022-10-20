import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { filter, forkJoin, map, Observable, of, mergeMap } from 'rxjs';
import { catchError, distinct, switchMap, toArray } from 'rxjs/operators';

import { RootObject } from '../models/cityList.model';
import { RootObject2 } from '../models/cityGeoIdInfo.model';
import { RootObject3} from '../models/urbanArea.model';
import { RootObject4, Image } from '../models/urbanAreaImages.model';
import { Category, RootObject5 } from '../models/urbanAreaScores.model';


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

  //gets the list of those cities that match the query
  getCitySearchArr(encoded: string): Observable<RootObject2[]> {
    let UAs$ = this.http.get<RootObject>(`https://api.teleport.org/api/cities/?search=${encoded}`).pipe(
      map(obj => obj["_embedded"]["city:search-results"]),
      switchMap(objs => objs),
      mergeMap(obj => this.http.get<RootObject2>(obj["_links"]["city:item"]["href"])),
      filter(obj => obj["_links"]["city:urban_area"] !== undefined),
      distinct(obj => obj["_links"]["city:urban_area"]["href"]),
      toArray(),
      catchError(this.handleError<RootObject2[]>('getCitySearchArr')),
    );

    return UAs$;
  };

  //gets Urban Area Infos
  getUrbanArea(id: number): Observable<[RootObject3["name"], Image, [RootObject5["summary"], RootObject5["teleport_city_score"], Category[]]]>  {

    let stream$ = this.http.get<RootObject2>(`https://api.teleport.org/api/cities/geonameid:${id}/`).pipe(
      mergeMap(obj => this.http.get<RootObject3>((obj["_links"]["city:urban_area"]["href"]))),
      catchError(this.handleError<RootObject3>('getUrbanArea'))
    );

    return this.getDetails(stream$);

  };

  //gets name, images, summary, teleport city score, categories
  getDetails(obj: Observable<RootObject3>): Observable<[RootObject3["name"], Image, [RootObject5["summary"], RootObject5["teleport_city_score"], Category[]]]> {
    let name = this.getName(obj);
    let images = this.getImages(obj);
    let scores = this.getScoresInfos(obj);

    return forkJoin([name, images, scores])
  };

  //gets the name of the city
  getName(obj: Observable<RootObject3>): Observable<RootObject3["name"]> {
    
    let name$ = obj.pipe(
      map(obj => obj["name"]),
      catchError(this.handleError<string>('getName'))
    );

    return name$;
    
  };

  //gets city's images
  getImages(obj: Observable<RootObject3>): Observable<Image> {
    let images$ = obj.pipe(
      mergeMap(obj => this.http.get<RootObject4>(obj["_links"]["ua:images"]["href"])),
      map(obj => obj["photos"][0]["image"]),
      catchError(this.handleError<Image>('getImages'))
    );

    return images$;
  };

  //gets scores url
  getScoresInfos(obj: Observable<RootObject3>): Observable<[RootObject5["summary"], RootObject5["teleport_city_score"], Category[]]> {

    let scoresUrl$ = obj.pipe(
      mergeMap(obj => this.http.get<RootObject5>(obj["_links"]["ua:scores"]["href"])),
      catchError(this.handleError<RootObject5>('getScoresInfos'))
    );

    return this.getScoresDetails(scoresUrl$);
  };

  //get scores objects' summary, teleport city score and category
  getScoresDetails(obj: Observable<RootObject5>): Observable<[RootObject5["summary"], RootObject5["teleport_city_score"], Category[]]>  {

    let summary$ = obj.pipe(
      map(obj => obj["summary"]),
      catchError(this.handleError<string>('getScoresDetailsSummary'))
    );

    let globalScore$ = obj.pipe(
      map(obj => obj["teleport_city_score"]),
      catchError(this.handleError<number>('getScoreDetailsGlobalScore'))
    );

    let categories$ = obj.pipe(
      map(obj => obj["categories"]),
      catchError(this.handleError<Category[]>('getScoresDetailsCategories'))
    );

    return forkJoin([summary$, globalScore$, categories$]);
  };


}
