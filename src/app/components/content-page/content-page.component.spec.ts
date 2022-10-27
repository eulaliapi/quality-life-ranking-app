import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { RootObject2 } from 'src/app/models/cityGeoIdInfo.model';
import { CityService } from 'src/app/services/city.service';
import { ContentPageComponent } from './content-page.component';

describe('ContentPageComponent', () => {
  let component: ContentPageComponent;
  let fixture: ComponentFixture<ContentPageComponent>;
  let cityServiceSpy: any;

  beforeEach(async () => {
    cityServiceSpy = jasmine.createSpyObj<CityService>(['getCitySearchArr']);

    await TestBed.configureTestingModule({
      declarations: [ContentPageComponent],
      providers: [{ provide: CityService, useValue: cityServiceSpy }],
      imports: [RouterTestingModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('requestedCity should be undefined at first and receive a string as its value ', () => {
    expect(component.requestedCity).toBeUndefined();

    let expectedValue = 'testcity';
    component.requestedCity = expectedValue;

    expect(component.requestedCity).toEqual(expectedValue);

  });

  it('showCityList should be true', () => {
    expect(component.showCityList).toBeTrue();
  });

  it('cityList should be empty', () => {
    expect(component.cityList.length).toBe(0)
  });

  it('if requestedCity is false getCitySearchRes() should not be called else it should be called', () => {
    spyOn(component, 'getCitySearchRes');

    component.requestedCity = undefined;
    component.ngOnChanges();
    expect(component.getCitySearchRes).not.toHaveBeenCalled();

    component.requestedCity = 'test city';
    component.ngOnChanges();
    expect(component.getCitySearchRes).toHaveBeenCalled();
  });

  describe('getCitySearchArr()', () => {
    let rootObject2Dummy: RootObject2[] = [{ "_links": { "city:admin1_division": { "href": "https://abcde", "name": "testDivision" }, "city:alternate-names": { "href": "https://api.teleport.org/api/cities/geonameid:12345/alternate_names/" }, "city:country": { "href": "https://abcdefg", "name": "testCountry" }, "city:timezone": { "href": "https://api.teleport.org/api/timezones/iana:testCountryDivision/", "name": "testCountry/division" }, "city:urban_area": { "href": "https://api.teleport.org/api/urban_areas/slug:testSlug/", "name": "testSlug" }, "curies": [{ "href": "https://developers.teleport.org/api/resources/Location/#!/relations/{rel}/", "name": "location", "templated": true }, { "href": "https://developers.teleport.org/api/resources/City/#!/relations/{rel}/", "name": "city", "templated": true }, { "href": "https://developers.teleport.org/api/resources/UrbanArea/#!/relations/{rel}/", "name": "ua", "templated": true }, { "href": "https://developers.teleport.org/api/resources/Country/#!/relations/{rel}/", "name": "country", "templated": true }, { "href": "https://developers.teleport.org/api/resources/Admin1Division/#!/relations/{rel}/", "name": "a1", "templated": true }, { "href": "https://developers.teleport.org/api/resources/Timezone/#!/relations/{rel}/", "name": "tz", "templated": true }], "self": { "href": "https://api.teleport.org/api/cities/geonameid:12345/" } }, "full_name": "testCity, testCountry", "geoname_id": 12345, "location": { "geohash": "9q8yyk8yuv26emr0cctm", "latlon": { "latitude": 37.3, "longitude": -122.4342 } }, "name": "testCity", "population": 856816 },{ "_links": { "city:admin1_division": { "href": "https://abcde", "name": "testDivision" }, "city:alternate-names": { "href": "https://api.teleport.org/api/cities/geonameid:12345/alternate_names/" }, "city:country": { "href": "https://abcdefg", "name": "testCountry" }, "city:timezone": { "href": "https://api.teleport.org/api/timezones/iana:testCountryDivision/", "name": "testCountry/division" }, "city:urban_area": { "href": "https://api.teleport.org/api/urban_areas/slug:testSlug/", "name": "testSlug" }, "curies": [{ "href": "https://developers.teleport.org/api/resources/Location/#!/relations/{rel}/", "name": "location", "templated": true }, { "href": "https://developers.teleport.org/api/resources/City/#!/relations/{rel}/", "name": "city", "templated": true }, { "href": "https://developers.teleport.org/api/resources/UrbanArea/#!/relations/{rel}/", "name": "ua", "templated": true }, { "href": "https://developers.teleport.org/api/resources/Country/#!/relations/{rel}/", "name": "country", "templated": true }, { "href": "https://developers.teleport.org/api/resources/Admin1Division/#!/relations/{rel}/", "name": "a1", "templated": true }, { "href": "https://developers.teleport.org/api/resources/Timezone/#!/relations/{rel}/", "name": "tz", "templated": true }], "self": { "href": "https://api.teleport.org/api/cities/geonameid:12345/" } }, "full_name": "testCity, testCountry", "geoname_id": 12345, "location": { "geohash": "9q8yyk8yuv26emr0cctm", "latlon": { "latitude": 37.3, "longitude": -122.4342 } }, "name": "testCity", "population": 856816 }];

    it('if requestedCity is false cityService.getCitySearchArr() should not be called', () => {
      cityServiceSpy.getCitySearchArr.and.returnValue(of(rootObject2Dummy));
      component.requestedCity = undefined;

      component.getCitySearchRes();
      expect(cityServiceSpy.getCitySearchArr).not.toHaveBeenCalled();
    });

    it('if requestedCity is true cityService.getCitySearchArr() should be called', () => {
      cityServiceSpy.getCitySearchArr.and.returnValue(of(rootObject2Dummy));
      component.requestedCity = 'test city';

      component.getCitySearchRes();
      expect(cityServiceSpy.getCitySearchArr).toHaveBeenCalled();
      expect(cityServiceSpy.getCitySearchArr).toHaveBeenCalledWith(encodeURIComponent(component.requestedCity));
    });

    it('the array returned by cityService.getCitySearchArr() should be assigned to cityList', () => {
      expect(component.cityList.length).toBe(0);

      cityServiceSpy.getCitySearchArr.and.returnValue(of(rootObject2Dummy));
      component.requestedCity = 'test city';

      component.getCitySearchRes();
      expect(cityServiceSpy.getCitySearchArr).toHaveBeenCalled();
      expect(cityServiceSpy.getCitySearchArr).toHaveBeenCalledWith(encodeURIComponent(component.requestedCity));
      expect(component.cityList.length).toEqual(rootObject2Dummy.length);
    });

    it('if cityList.length > 0 showCityList should be true', () => {
      cityServiceSpy.getCitySearchArr.and.returnValue(of(rootObject2Dummy));
      let encodedParam = encodeURIComponent('test city');
      component.cityList = [];
      let booleanValue: boolean = false;

      cityServiceSpy.getCitySearchArr(encodedParam).subscribe((data: RootObject2[]) => {
        component.cityList = data;
        booleanValue = component.cityList.length > 0 ? component.showCityList = true : component.showCityList = false;
      });

      expect(booleanValue).toBeTrue()

    });

    it('if cityList.length = 0 showCityList should be false', () => {
      cityServiceSpy.getCitySearchArr.and.returnValue(of([]));
      let encodedParam = encodeURIComponent('test city');
      component.cityList = [];
      let booleanValue: boolean = true;

      cityServiceSpy.getCitySearchArr(encodedParam).subscribe((data: RootObject2[]) => {
        component.cityList = data;
        booleanValue = component.cityList.length > 0 ? component.showCityList = true : component.showCityList = false;
      });

      expect(booleanValue).toBeFalse()
    });

  });

  describe('HTML Content', () => {
    
    it('should contain a div which should contain a section which should contain an empty ul', () => {
      let divDe = fixture.debugElement.query(By.css('div'));
      let divEl = divDe.nativeElement;
      let sectionDe = fixture.debugElement.query(By.css('section'));
      let sectionEl = sectionDe.nativeElement;
      let ulDe = fixture.debugElement.query(By.css('ul'));
      let ulEl = ulDe.nativeElement;

      expect(divEl).toBeDefined();
      expect(sectionEl).toBeDefined();
      expect(divEl.children[0]).toBe(sectionEl);
      expect(sectionEl.children[0]).toBe(ulEl); 
      expect(ulEl.children.length).toBe(0); 
    });

    describe('#showList when cityList.length > 0', () => {
    let rootObject2Dummy: RootObject2[] = [{ "_links": { "city:admin1_division": { "href": "https://abcde", "name": "testDivision" }, "city:alternate-names": { "href": "https://api.teleport.org/api/cities/geonameid:12345/alternate_names/" }, "city:country": { "href": "https://abcdefg", "name": "testCountry" }, "city:timezone": { "href": "https://api.teleport.org/api/timezones/iana:testCountryDivision/", "name": "testCountry/division" }, "city:urban_area": { "href": "https://api.teleport.org/api/urban_areas/slug:testSlug/", "name": "testSlug" }, "curies": [{ "href": "https://developers.teleport.org/api/resources/Location/#!/relations/{rel}/", "name": "location", "templated": true }, { "href": "https://developers.teleport.org/api/resources/City/#!/relations/{rel}/", "name": "city", "templated": true }, { "href": "https://developers.teleport.org/api/resources/UrbanArea/#!/relations/{rel}/", "name": "ua", "templated": true }, { "href": "https://developers.teleport.org/api/resources/Country/#!/relations/{rel}/", "name": "country", "templated": true }, { "href": "https://developers.teleport.org/api/resources/Admin1Division/#!/relations/{rel}/", "name": "a1", "templated": true }, { "href": "https://developers.teleport.org/api/resources/Timezone/#!/relations/{rel}/", "name": "tz", "templated": true }], "self": { "href": "https://api.teleport.org/api/cities/geonameid:12345/" } }, "full_name": "testCity, testCountry", "geoname_id": 12345, "location": { "geohash": "9q8yyk8yuv26emr0cctm", "latlon": { "latitude": 37.3, "longitude": -122.4342 } }, "name": "testCity", "population": 856816 },{ "_links": { "city:admin1_division": { "href": "https://poiuu", "name": "testDivision2" }, "city:alternate-names": { "href": "https://api.teleport.org/api/cities/geonameid:67890/alternate_names/" }, "city:country": { "href": "https://kskslq", "name": "testCountry2" }, "city:timezone": { "href": "https://api.teleport.org/api/timezones/iana:testCountryDivision2/", "name": "testCountry2/division2" }, "city:urban_area": { "href": "https://api.teleport.org/api/urban_areas/slug:testSlug2/", "name": "testSlug2" }, "curies": [{ "href": "https://developers.teleport.org/api/resources/Location/#!/relations/{rel}/", "name": "location", "templated": true }, { "href": "https://developers.teleport.org/api/resources/City/#!/relations/{rel}/", "name": "city", "templated": true }, { "href": "https://developers.teleport.org/api/resources/UrbanArea/#!/relations/{rel}/", "name": "ua", "templated": true }, { "href": "https://developers.teleport.org/api/resources/Country/#!/relations/{rel}/", "name": "country", "templated": true }, { "href": "https://developers.teleport.org/api/resources/Admin1Division/#!/relations/{rel}/", "name": "a1", "templated": true }, { "href": "https://developers.teleport.org/api/resources/Timezone/#!/relations/{rel}/", "name": "tz", "templated": true }], "self": { "href": "https://api.teleport.org/api/cities/geonameid:67890/" } }, "full_name": "testCity2, testCountry2", "geoname_id": 67890, "location": { "geohash": "9q8yyk8yuv26ediwlrkm", "latlon": { "latitude": 37.3, "longitude": -122.4342 } }, "name": "testCity2", "population": 856816 }];

      it('should contain an <ul> and a <div class="city-info">, <ul> should contain a <li> element for each element of cityList ', () => {
        let sectionDe = fixture.debugElement.query(By.css('section'));
        let sectionEl = sectionDe.nativeElement;
        let ulDe = fixture.debugElement.query(By.css('ul'));
        let ulEl = ulDe.nativeElement;

        component.cityList = rootObject2Dummy;

        fixture.detectChanges();
        
        expect(sectionEl.children[0]).toBe(ulEl);
        expect(ulEl.children.length).toEqual(component.cityList.length);

        expect(sectionEl.children[1]).toBeDefined();
        expect(sectionEl.children[1]).toHaveClass('city-info');

        let divCityInfo = sectionEl.children[1];
        expect(ulEl.nextSibling).toBe(divCityInfo);
        expect(divCityInfo.children.length).toBe(1);
        let divCityInfoChild = divCityInfo.children[0];
        let divCityInfoChildInnerText = "*If your city is not in this list, it means we don't have information about that city yet. Please enter another city."
        expect(divCityInfoChild.innerText).toBe(divCityInfoChildInnerText);
        
      });

      it('each <li> should contain an <a>. Its content should be the name of the city and the name of the corrisponding city  urban area in round brackets', () => {
        let ulDe = fixture.debugElement.query(By.css('ul'));
        let ulEl = ulDe.nativeElement;

        component.cityList = rootObject2Dummy
        fixture.detectChanges();

        expect(ulEl.children.length).toEqual(component.cityList.length);

        for(let i = 0; i < component.cityList.length; i++) {
          expect(ulEl.children[i].children.length).toBe(1);
          expect(ulEl.children[i].children[0].innerText).toBe(`${component.cityList[i].full_name} (${component.cityList[i]._links['city:urban_area'].name})`);
        };

      });

      it('each <a> when clicked should bring the user to the corrisponding city-ranking path', () => {
        let ulDe = fixture.debugElement.query(By.css('ul'));
        let ulEl = ulDe.nativeElement;

        component.cityList = rootObject2Dummy;
        fixture.detectChanges()

        for(let i = 0; i < component.cityList.length; i++) {
          expect(ulEl.children[i].children[0].pathname).toBe(`/city-ranking/${component.cityList[i].geoname_id}`);
        };

      });

    });

    describe('#showMsg', () => {
      
      it('should contain two <p>', () => {
        component.showCityList = false;

        let sectionDe = fixture.debugElement.query(By.css('section'));
        let sectionEl = sectionDe.nativeElement;

        fixture.detectChanges();

        expect(sectionEl.children.length).toBe(2);

        expect(sectionEl.children[0]).toHaveClass('heading');
        expect(sectionEl.children[0].innerText).toBe("We're sorry!");
        
        expect(sectionEl.children[1].innerText).toBe("There are no available information for this city yet.\nTry searching for another one!")

      });
    });

  });



});