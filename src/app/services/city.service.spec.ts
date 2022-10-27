import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { CityService } from './city.service';
import { Image, RootObject4 } from '../models/urbanAreaImages.model';
import { Category, RootObject5 } from '../models/urbanAreaScores.model';
import { RootObject } from '../models/cityList.model'
import { RootObject2 } from '../models/cityGeoIdInfo.model';
import { ErrorComponent } from '../components/error/error.component';
import { RootObject3 } from '../models/urbanArea.model';
import { HttpErrorResponse } from '@angular/common/http';

describe('CityService', () => {
  let cityService: CityService;
  let httpTestingController: HttpTestingController;
  let rootObjectDummy: RootObject = { "_embedded": { "city:search-results": [{ "_links": { "city:item": { "href": "https://api.teleport.org/api/cities/geonameid:12345/" } }, "matching_alternate_names": [{ "name": "Abcd" }], "matching_full_name": "Abcdefgh" }] }, "_links": { "curies": [{ "href": "https://developers.teleport.org/api/resources/Location/#!/relations/{rel}/", "name": "location", "templated": true }, { "href": "https://developers.teleport.org/api/resources/City/#!/relations/{rel}/", "name": "city", "templated": true }, { "href": "https://developers.teleport.org/api/resources/UrbanArea/#!/relations/{rel}/", "name": "ua", "templated": true }, { "href": "https://developers.teleport.org/api/resources/Country/#!/relations/{rel}/", "name": "country", "templated": true }, { "href": "https://developers.teleport.org/api/resources/Admin1Division/#!/relations/{rel}/", "name": "a1", "templated": true }, { "href": "https://developers.teleport.org/api/resources/Timezone/#!/relations/{rel}/", "name": "tz", "templated": true }], "self": { "href": "https://api.teleport.org/api/cities/?search=firenze\u0026geohash=" } }, "count": 1 };
  let rootObject2Dummy: RootObject2[] = [{ "_links": { "city:admin1_division": { "href": "https://abcde", "name": "testDivision" }, "city:alternate-names": { "href": "https://api.teleport.org/api/cities/geonameid:12345/alternate_names/" }, "city:country": { "href": "https://abcdefg", "name": "testCountry" }, "city:timezone": { "href": "https://api.teleport.org/api/timezones/iana:testCountryDivision/", "name": "testCountry/division" }, "city:urban_area": { "href": "https://api.teleport.org/api/urban_areas/slug:testSlug/", "name": "testSlug" }, "curies": [{ "href": "https://developers.teleport.org/api/resources/Location/#!/relations/{rel}/", "name": "location", "templated": true }, { "href": "https://developers.teleport.org/api/resources/City/#!/relations/{rel}/", "name": "city", "templated": true }, { "href": "https://developers.teleport.org/api/resources/UrbanArea/#!/relations/{rel}/", "name": "ua", "templated": true }, { "href": "https://developers.teleport.org/api/resources/Country/#!/relations/{rel}/", "name": "country", "templated": true }, { "href": "https://developers.teleport.org/api/resources/Admin1Division/#!/relations/{rel}/", "name": "a1", "templated": true }, { "href": "https://developers.teleport.org/api/resources/Timezone/#!/relations/{rel}/", "name": "tz", "templated": true }], "self": { "href": "https://api.teleport.org/api/cities/geonameid:12345/" } }, "full_name": "testCity, testCountry", "geoname_id": 12345, "location": { "geohash": "9q8yyk8yuv26emr0cctm", "latlon": { "latitude": 37.3, "longitude": -122.4342 } }, "name": "testCity", "population": 856816 }];
  let rootObject3Dummy: RootObject3 = { "_links": { "curies": [{ "href": "https:abcdef", "name": "location", "templated": true }, { "href": "https://efghi/", "name": "city", "templated": true }, { "href": "https://jklmn/", "name": "ua", "templated": true }, { "href": "https://opqrs/", "name": "country", "templated": true }, { "href": "https://tuvwxyz", "name": "a1", "templated": true }, { "href": "https://abcde", "name": "tz", "templated": true }], "self": { "href": "https://api.teleport.org/api/urban_areas/slug:testSlug/" }, "ua:admin1-divisions": [{ "href": "https://fghij", "name": "testRegion" }], "ua:cities": { "href": "https://api.teleport.org/api/urban_areas/slug:testSlug/cities/" }, "ua:continent": { "href": "https://jklmno", "name": "Europe" }, "ua:countries": [{ "href": "https://pqrst", "name": "testCountry" }], "ua:details": { "href": "https://api.teleport.org/api/urban_areas/slug:testCity/details/" }, "ua:identifying-city": { "href": "https://api.teleport.org/api/cities/geonameid:12345/", "name": "testCity" }, "ua:images": { "href": "https://api.teleport.org/api/urban_areas/slug:testSlug/images/" }, "ua:primary-cities": [{ "href": "https://api.teleport.org/api/cities/geonameid:12345/", "name": "testCity" }], "ua:salaries": { "href": "https://api.teleport.org/api/urban_areas/slug:testSlug/salaries/" }, "ua:scores": { "href": "https://api.teleport.org/api/urban_areas/slug:testSlug/scores/" } }, "bounding_box": { "latlon": { "east": 11.4716, "north": 43.8039, "south": 43.7009, "west": 11.133 } }, "continent": "testContinent", "full_name": "testFullname", "is_government_partner": false, "mayor": "testMayor", "name": "testCity", "slug": "testSlug", "teleport_city_url": "https://teleport.org/cities/testCity/", "ua_id": "spzcp" };
  let rootObject4Dummy: RootObject4 = { "_links": { "curies": [{ "href": "https://qwerty", "name": "location", "templated": true }, { "href": "https://uiop", "name": "city", "templated": true }, { "href": "https://asdf", "name": "ua", "templated": true }, { "href": "https://ghjkl", "name": "country", "templated": true }, { "href": "https://zxcv", "name": "a1", "templated": true }, { "href": "https://bnm", "name": "tz", "templated": true }], "self": { "href": "https://api.teleport.org/api/urban_areas/slug:testSlug/images/" } }, "photos": [{ "attribution": { "license": "Attribution 2.0 Generic (CC BY 2.0)", "photographer": "testPhotographer", "site": "testSite", "source": "https://www.testSource" }, "image": { "mobile": "https://mobile-pic.jpg", "web": "https://web-pic.jpg" } }] };
  let rootObject5Dummy: RootObject5 = { "_links": { "curies": [{ "href": "https://qazw", "name": "location", "templated": true }, { "href": "sxed", "name": "city", "templated": true }, { "href": "crfv", "name": "ua", "templated": true }, { "href": "https://tgby", "name": "country", "templated": true }, { "href": "https://hnuj", "name": "a1", "templated": true }, { "href": "https://mikolp", "name": "tz", "templated": true }], "self": { "href": "https://api.teleport.org/api/urban_areas/slug:testSlug/scores/" } }, "categories": [{ "color": "#f3c32c", "name": "Housing", "score_out_of_10": 1.0 }, { "color": "#f3d630", "name": "Cost of Living", "score_out_of_10": 2.618 }, { "color": "#f4eb33", "name": "Startups", "score_out_of_10": 10.0 }, { "color": "#d2ed31", "name": "Venture Capital", "score_out_of_10": 10.0 }, { "color": "#7adc29", "name": "Travel Connectivity", "score_out_of_10": 3.6545000000000005 }, { "color": "#36cc24", "name": "Commute", "score_out_of_10": 4.687250000000001 }, { "color": "#19ad51", "name": "Business Freedom", "score_out_of_10": 8.671 }, { "color": "#0d6999", "name": "Safety", "score_out_of_10": 5.7155000000000005 }, { "color": "#051fa5", "name": "Healthcare", "score_out_of_10": 8.748 }, { "color": "#150e78", "name": "Education", "score_out_of_10": 8.6245 }, { "color": "#3d14a4", "name": "Environmental Quality", "score_out_of_10": 6.4815000000000005 }, { "color": "#5c14a1", "name": "Economy", "score_out_of_10": 6.5145 }, { "color": "#88149f", "name": "Taxation", "score_out_of_10": 4.488 }, { "color": "#b9117d", "name": "Internet Access", "score_out_of_10": 5.605500000000001 }, { "color": "#d10d54", "name": "Leisure \u0026 Culture", "score_out_of_10": 9.407 }, { "color": "#e70c26", "name": "Tolerance", "score_out_of_10": 8.012500000000001 }, { "color": "#f1351b", "name": "Outdoors", "score_out_of_10": 7.014 }], "summary": "summary", "teleport_city_score": 50.09768 };
  let cityDummy: [string, Image, [string, number, Category[]]] = ["testCity", { "mobile": "https://mobile-pic.jpg", "web": "https://web-pic.jpg" }, ["summary", 50.09768, [{ "color": "#f3c32c", "name": "Housing", "score_out_of_10": 1.0 }, { "color": "#f3d630", "name": "Cost of Living", "score_out_of_10": 2.618 }, { "color": "#f4eb33", "name": "Startups", "score_out_of_10": 10.0 }, { "color": "#d2ed31", "name": "Venture Capital", "score_out_of_10": 10.0 }, { "color": "#7adc29", "name": "Travel Connectivity", "score_out_of_10": 3.6545000000000005 }, { "color": "#36cc24", "name": "Commute", "score_out_of_10": 4.687250000000001 }, { "color": "#19ad51", "name": "Business Freedom", "score_out_of_10": 8.671 }, { "color": "#0d6999", "name": "Safety", "score_out_of_10": 5.7155000000000005 }, { "color": "#051fa5", "name": "Healthcare", "score_out_of_10": 8.748 }, { "color": "#150e78", "name": "Education", "score_out_of_10": 8.6245 }, { "color": "#3d14a4", "name": "Environmental Quality", "score_out_of_10": 6.4815000000000005 }, { "color": "#5c14a1", "name": "Economy", "score_out_of_10": 6.5145 }, { "color": "#88149f", "name": "Taxation", "score_out_of_10": 4.488 }, { "color": "#b9117d", "name": "Internet Access", "score_out_of_10": 5.605500000000001 }, { "color": "#d10d54", "name": "Leisure \u0026 Culture", "score_out_of_10": 9.407 }, { "color": "#e70c26", "name": "Tolerance", "score_out_of_10": 8.012500000000001 }, { "color": "#f1351b", "name": "Outdoors", "score_out_of_10": 7.014 }]]]

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'error', component: ErrorComponent }]), HttpClientTestingModule],
      providers: [CityService]
    });

    cityService = TestBed.inject(CityService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(cityService).toBeTruthy();
  });

  it('getCitySerachArr(string) should get the list of cities that match the query', (done: DoneFn) => {
    let getCitySearchArrParam = "test";

    cityService.getCitySearchArr(getCitySearchArrParam).subscribe((data) => {
      expect(data).toBeDefined();
      expect(data).toEqual(rootObject2Dummy);
    });

    const request = httpTestingController.expectOne(
      `https://api.teleport.org/api/cities/?search=${getCitySearchArrParam}`
    );
    expect(request.request.method).toBe("GET");
    request.flush(rootObjectDummy);

    const secondRequest = httpTestingController.expectOne(
      rootObjectDummy["_embedded"]["city:search-results"][0]["_links"]["city:item"]["href"]
    );
    expect(secondRequest.request.method).toBe("GET");
    secondRequest.flush(rootObject2Dummy[0])

    httpTestingController.verify();

    done();
  });

  it('getUrbanArea(number) should return urban area infos', (done: DoneFn) => {
    let getUrbanAreaParam = 12345;

    cityService.getUrbanArea(getUrbanAreaParam).subscribe((data) => {
      expect(data).toBeDefined();
      expect(data).toEqual(cityDummy);
    });

    const requests = httpTestingController.match(`https://api.teleport.org/api/cities/geonameid:${getUrbanAreaParam}/`);
    requests[0].flush(rootObject2Dummy[0]);
    requests[1].flush(rootObject2Dummy[0]);
    requests[2].flush(rootObject2Dummy[0])
    requests[3].flush(rootObject2Dummy[0]);
    requests[4].flush(rootObject2Dummy[0]);

    const secondRequests = httpTestingController.match('https://api.teleport.org/api/urban_areas/slug:testSlug/');
    secondRequests[0].flush(rootObject3Dummy);
    secondRequests[1].flush(rootObject3Dummy);
    secondRequests[2].flush(rootObject3Dummy);
    secondRequests[3].flush(rootObject3Dummy);
    secondRequests[4].flush(rootObject3Dummy);

    const thirdRequest = httpTestingController.expectOne('https://api.teleport.org/api/urban_areas/slug:testSlug/images/');
    thirdRequest.flush(rootObject4Dummy);

    const fourthRequest = httpTestingController.match('https://api.teleport.org/api/urban_areas/slug:testSlug/scores/');
    fourthRequest[0].flush(rootObject5Dummy);
    fourthRequest[1].flush(rootObject5Dummy);
    fourthRequest[2].flush(rootObject5Dummy);

    done();
  });

  it('test for error', (done: DoneFn) => {
    let getCitySearchArrParam = "test";
    const emsg = 'deliberate 404 error';

    cityService.getCitySearchArr(getCitySearchArrParam).subscribe({
      next: () => fail('should have failed with the 404 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).withContext('status').toEqual(404);
        expect(error.error).withContext('message').toEqual(emsg);
      }
    });

    const req = httpTestingController.expectOne(`https://api.teleport.org/api/cities/?search=${getCitySearchArrParam}`);
    // req.flush(emsg, { status: 404, statusText: 'Not Found' });

    done()
  })

});
