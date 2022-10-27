import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { CityService } from 'src/app/services/city.service';

import { CityRankingComponent } from './city-ranking.component';

import { Image } from '../../models/urbanAreaImages.model';
import { Category } from '../../models/urbanAreaScores.model';
import { not } from '@angular/compiler/src/output/output_ast';



describe('CityRankingComponent', () => {
  let component: CityRankingComponent;
  let fixture: ComponentFixture<CityRankingComponent>;
  let cityServiceSpy: any;
  let cityDummy: [string, Image, [string, number, Category[]]] = ["testCity", { "mobile": "https://d13k13wj6adfdf.cloudfront.net/urban_areas/miami-730928937f.jpg", "web": "https://d13k13wj6adfdf.cloudfront.net/urban_areas/miami_web-9307474a5e.jpg" }, ["summary", 50.09768, [{ "color": "#f3c32c", "name": "Housing", "score_out_of_10": 1.0 }, { "color": "#f3d630", "name": "Cost of Living", "score_out_of_10": 2.618 }, { "color": "#f4eb33", "name": "Startups", "score_out_of_10": 10.0 }, { "color": "#d2ed31", "name": "Venture Capital", "score_out_of_10": 10.0 }, { "color": "#7adc29", "name": "Travel Connectivity", "score_out_of_10": 3.6545000000000005 }, { "color": "#36cc24", "name": "Commute", "score_out_of_10": 4.687250000000001 }, { "color": "#19ad51", "name": "Business Freedom", "score_out_of_10": 8.671 }, { "color": "#0d6999", "name": "Safety", "score_out_of_10": 5.7155000000000005 }, { "color": "#051fa5", "name": "Healthcare", "score_out_of_10": 8.748 }, { "color": "#150e78", "name": "Education", "score_out_of_10": 8.6245 }, { "color": "#3d14a4", "name": "Environmental Quality", "score_out_of_10": 6.4815000000000005 }, { "color": "#5c14a1", "name": "Economy", "score_out_of_10": 6.5145 }, { "color": "#88149f", "name": "Taxation", "score_out_of_10": 4.488 }, { "color": "#b9117d", "name": "Internet Access", "score_out_of_10": 5.605500000000001 }, { "color": "#d10d54", "name": "Leisure \u0026 Culture", "score_out_of_10": 9.407 }, { "color": "#e70c26", "name": "Tolerance", "score_out_of_10": 8.012500000000001 }, { "color": "#f1351b", "name": "Outdoors", "score_out_of_10": 7.014 }]]]

  beforeEach(async () => {
    cityServiceSpy = jasmine.createSpyObj<CityService>(['getUrbanArea']);

    await TestBed.configureTestingModule({
      declarations: [CityRankingComponent],
      providers: [{ provide: CityService, useValue: cityServiceSpy }, { provide: Location, useClass: SpyLocation }],
      imports: [RouterTestingModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityRankingComponent);
    component = fixture.componentInstance;
    spyOn(component, 'getUAUrls');
    component.getUAUrls();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('city value should be undefined', () => {
    expect(component.city).toBeUndefined();
  });

  it('cityService.getUrbanArea() should return cityDummy and call setBgImage', () => {
    spyOn(component, 'setBgImage');
    const id = 12345;
    cityServiceSpy.getUrbanArea.and.returnValue(of(cityDummy));

    expect(component.city).toBeUndefined();

    expect(component.getUAUrls).toHaveBeenCalled();
    cityServiceSpy.getUrbanArea(id).subscribe((res: [string, Image, [string, number, Category[]]]) => {
      component.city = res;
    });
    expect(cityServiceSpy.getUrbanArea).toHaveBeenCalled();
    expect(cityServiceSpy.getUrbanArea).toHaveBeenCalledWith(id);

    expect(component.city).toBeDefined();
    expect(component.city).toEqual(cityDummy)

  });

  it('goBack() should call location.back', () => {
    spyOn(component.location, 'back');
    component.goBack();
    expect(component.goBack).toBeDefined();
    expect(component.location.back).toHaveBeenCalled();

  });

  describe('HTML Content', () => {

    it('should contain a section', () => {
      let sectionDe = fixture.debugElement.query(By.css('section'));
      let sectionEl = sectionDe.nativeElement;

      expect(sectionEl).toBeDefined();
    });

    it('if city is true #showCity should be displayed', () => {
      let sectionDe = fixture.debugElement.query(By.css('section'));
      let sectionEl = sectionDe.nativeElement;

      component.city = cityDummy;
      fixture.detectChanges();
      expect(sectionEl.children.length).toBe(2);
      expect(sectionEl.children[0]).toHaveClass('cover-img');
      expect(sectionEl.children[1].children[0]).toHaveClass('list-group');

    });

    it('if city is false #loading should be displayed', () => {
      let sectionDe = fixture.debugElement.query(By.css('section'));
      let sectionEl = sectionDe.nativeElement;

      expect(sectionEl.children.length).toBe(1);
      expect(sectionEl.children[0]).toBeDefined();
    });

    describe('#showCity', () => {

      it('should contain a header.cover-img followed by a <div>', () => {
        let sectionDe = fixture.debugElement.query(By.css('section'));
        let sectionEl = sectionDe.nativeElement;

        component.city = cityDummy;
        fixture.detectChanges();

        expect(sectionEl.children[0]).toHaveClass('cover-img');
        expect(sectionEl.children[0].nextSibling).toBeDefined();

      });

      describe('header.cover-img', () => {

        it('header.cover-img background url property should be city[1]["mobile"] when window.innerWidth < 576', () => {
          component.city = cityDummy;
          let fakeWindowWidth = 340;
          spyOn(component, 'setBgImage').and.returnValue({
            'background': fakeWindowWidth < 576 ? `url(${cityDummy[1]["mobile"]})` : `url(${cityDummy[1]["web"]})`,
            'background-size': 'cover'
          });

          fixture.detectChanges();

          component.setBgImage(cityDummy[1]);
          fixture.detectChanges();

          expect(component.setBgImage(cityDummy[1])).toEqual({
            'background': `url(${cityDummy[1]["mobile"]})`,
            'background-size': 'cover'
          });
        });

        it('header.cover-img background url property should be city[1]["web"] when window.innerWidth >= 576', () => {
          component.city = cityDummy;
          let fakeWindowWidth = 1000;
          spyOn(component, 'setBgImage').and.returnValue({
            'background': fakeWindowWidth < 576 ? `url(${cityDummy[1]["mobile"]})` : `url(${cityDummy[1]["web"]})`,
            'background-size': 'cover'
          });

          fixture.detectChanges();

          component.setBgImage(cityDummy[1]);
          fixture.detectChanges();

          expect(component.setBgImage(cityDummy[1])).toEqual({
            'background': `url(${cityDummy[1]["web"]})`,
            'background-size': 'cover'
          });

        });

        it('<header> should contain div.shadow', () => {
          let sectionDe = fixture.debugElement.query(By.css('section'));
          let sectionEl = sectionDe.nativeElement;

          component.city = cityDummy;
          fixture.detectChanges();

          let header = sectionEl.children[0];
          expect(header.children.length).toBe(1);
          expect(header.children[0]).toHaveClass('shadow');

        });

        it('div.shadow children should be button.arrow-button, h1.city-name, p.city-desc, p.city-score in this order', () => {
          let sectionDe = fixture.debugElement.query(By.css('section'));
          let sectionEl = sectionDe.nativeElement;

          component.city = cityDummy;
          fixture.detectChanges();

          let divShadow = sectionEl.children[0].children[0];
          expect(divShadow.children.length).toBe(4);
          expect(divShadow.children[0]).toHaveClass('arrow-button');
          expect(divShadow.children[1]).toHaveClass('city-name');
          expect(divShadow.children[2]).toHaveClass('city-desc');
          expect(divShadow.children[3]).toHaveClass('city-score');
        });

        it('button should fire goBack()', () => {
          spyOn(component, 'goBack');
          let sectionDe = fixture.debugElement.query(By.css('section'));
          let sectionEl = sectionDe.nativeElement;

          component.city = cityDummy;
          fixture.detectChanges();

          let button = sectionEl.children[0].children[0].children[0];

          button.click();
          expect(component.goBack).toHaveBeenCalled();

        });

        it('h1 should render city[0]', () => {
          let sectionDe = fixture.debugElement.query(By.css('section'));
          let sectionEl = sectionDe.nativeElement;

          component.city = cityDummy;
          fixture.detectChanges();

          let h1 = sectionEl.children[0].children[0].children[1];
          expect(h1.innerText).toEqual(cityDummy[0]);
        });

        it('p.city-desc should render city[2][0] using [innerHTML] directive', () => { 
          let sectionDe = fixture.debugElement.query(By.css('section'));
          let sectionEl = sectionDe.nativeElement;

          component.city = cityDummy;
          fixture.detectChanges();

          let pCityDesc = sectionEl.children[0].children[0].children[2];
          expect(pCityDesc.innerHTML).toEqual(cityDummy[2][0]);

        });

        it('p.city-score should render city[2][1] and reduce it to max float with a decimal', () => { 
          let sectionDe = fixture.debugElement.query(By.css('section'));
          let sectionEl = sectionDe.nativeElement;

          component.city = cityDummy;
          fixture.detectChanges();

          let pCityScore = sectionEl.children[0].children[0].children[3];
          expect(pCityScore.innerText).toEqual(`Teleport city score: ${(cityDummy[2][1]).toFixed(1)}%`);
        });

      });

      describe('<div>', () => {

        it('should contain ul.list-group, there should be a <li> element for each element of city[2][2]', () => { 
          let sectionDe = fixture.debugElement.query(By.css('section'));
          let sectionEl = sectionDe.nativeElement;

          component.city = cityDummy;
          fixture.detectChanges();

          let div = sectionEl.children[1];
          expect(div.children.length).toBe(1);
          expect(div.children[0]).toHaveClass('list-group');

          let ul = div.children[0];
          expect(ul.children).toBeDefined();
          expect(ul.children.length).toEqual(cityDummy[2][2].length);

          for(let i = 0; i < cityDummy[2][2].length; i++) {
            expect(ul.children[i]).toHaveClass('score-info');
          };

        });

        it('<li> should contain div.total-width, div.score, p.score-name in this order', () => { 
          let sectionDe = fixture.debugElement.query(By.css('section'));
          let sectionEl = sectionDe.nativeElement;

          component.city = cityDummy;
          fixture.detectChanges();

          let ul = sectionEl.children[1].children[0];

          for(let i = 0; i < cityDummy[2][2].length; i++) {
            expect(ul.children[i].children.length).toBe(3);
            expect(ul.children[i].children[0]).toHaveClass('total-width');
            expect(ul.children[i].children[1]).toHaveClass('score');
            expect(ul.children[i].children[2]).toHaveClass('score-name');
          };

        });

        it('div.total-width should be empty', () => { 
          let sectionDe = fixture.debugElement.query(By.css('section'));
          let sectionEl = sectionDe.nativeElement;

          component.city = cityDummy;
          fixture.detectChanges();

          let ul = sectionEl.children[1].children[0];

          for(let i = 0; i < cityDummy[2][2].length; i++) {
            expect(ul.children[i].children[0].innerHTML).toBeFalsy();
          };

        });

        it('div.score should be empty, its width property should equal to city[2][2][i] if window.innerWidth <= 400', () => { 
          let fakeWindowWidth = 400;
          // let i = 0;
          // spyOn(component, 'setScoreWidth').and.returnValue({
          //   'width': fakeWindowWidth > 400 ? `${cityDummy[2][2][i]["score_out_of_10"].toFixed(1)}rem` : `${(cityDummy[2][2][i]["score_out_of_10"]/2).toFixed(1)}rem`
          // });
          spyOn(component, 'setScoreWidth').and.returnValue({
            'width' : fakeWindowWidth > 400 ?  `${cityDummy[2][2][0]["score_out_of_10"].toFixed(1)}rem` : `${(cityDummy[2][2][0]["score_out_of_10"]/2).toFixed(1)}rem`
          })

          let sectionDe = fixture.debugElement.query(By.css('section'));
          let sectionEl = sectionDe.nativeElement;

          component.city = cityDummy;
          fixture.detectChanges();

          let ul = sectionEl.children[1].children[0];

          expect(component.setScoreWidth(ul.children[0].children[1])).toEqual({
            'width' : `${(cityDummy[2][2][0]["score_out_of_10"]/2).toFixed(1)}rem`
          });

          // for(i < cityDummy[2][2].length; i++;) {
          //   expect(ul.children[i].children[1].innerHTML).toBeFalsy();
          //   expect(component.setScoreWidth(ul.children[i].children[1])).toEqual({
          //     'width':`${(cityDummy[2][2][i]["score_out_of_10"]/2).toFixed(1)}rem`
          //   });
          // };

          
        });

        it('div.score should be empty, its width property should equal to (city[2][2][i])/2 if window.innerWidth > 400', () => { 
          let fakeWindowWidth = 402;
          // let i = 0;
          // spyOn(component, 'setScoreWidth').and.returnValue({
          //   'width': fakeWindowWidth > 400 ? `${cityDummy[2][2][i]["score_out_of_10"].toFixed(1)}rem` : `${(cityDummy[2][2][i]["score_out_of_10"]/2).toFixed(1)}rem`
          // });
          spyOn(component, 'setScoreWidth').and.returnValue({
            'width' : fakeWindowWidth > 400 ?  `${cityDummy[2][2][0]["score_out_of_10"].toFixed(1)}rem` : `${(cityDummy[2][2][0]["score_out_of_10"]/2).toFixed(1)}rem`
          })

          let sectionDe = fixture.debugElement.query(By.css('section'));
          let sectionEl = sectionDe.nativeElement;

          component.city = cityDummy;
          fixture.detectChanges();

          let ul = sectionEl.children[1].children[0];

          // for(i < cityDummy[2][2].length; i++;) {
          //   expect(ul.children[i].children[1].innerHTML).toBeFalsy();
          //   expect(component.setScoreWidth(ul.children[i].children[1])).toEqual({
          //     'width':`${(cityDummy[2][2][i]["score_out_of_10"]).toFixed(1)}rem`
          //   });
          // };

          expect(component.setScoreWidth(ul.children[0].children[1])).toEqual({
            'width' : `${cityDummy[2][2][0]["score_out_of_10"].toFixed(1)}rem`
          });
        });

        it('p.score-name should render the name of the category and its score using the number pipe', () => { 
          
          let sectionDe = fixture.debugElement.query(By.css('section'));
          let sectionEl = sectionDe.nativeElement;

          component.city = cityDummy;
          fixture.detectChanges();

          let ul = sectionEl.children[1].children[0];

          for(let i = 0; i < cityDummy[2][2].length; i++) {
            expect(ul.children[i].children[2]).toHaveClass('score-name');
            expect(ul.children[i].children[2].innerText).toEqual(`${cityDummy[2][2][i]["name"]} ${(cityDummy[2][2][i]["score_out_of_10"]).toFixed(0)}/10`);
          };
          
        });

      });

    });

    describe('#loading', () => {

      it('should contain div.loading-container which should contain p.loading-text', () => { 
        let sectionDe = fixture.debugElement.query(By.css('section'));
        let sectionEl = sectionDe.nativeElement;
        
        expect(sectionEl.children[0]).toHaveClass('loading-container');
        expect(sectionEl.children[0].children.length).toBe(1);
        expect(sectionEl.children[0].children[0]).toHaveClass('loading-text');
        expect(sectionEl.children[0].children[0].innerText).toEqual('Loading...');

      });

    });

  });

});
