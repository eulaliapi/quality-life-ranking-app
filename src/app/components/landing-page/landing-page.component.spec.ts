import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LandingPageComponent } from './landing-page.component';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPageComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('variable "newRequestedCity" should be an empty string', () => {
    
    expect(component.newRequestedCity).toEqual("");
  });

  it('"newRequestedCity" value should equal to "getRequestedCity" parameter', fakeAsync(() => {
    const searchBarDe = fixture.debugElement.query(By.css('app-search-bar'));
    searchBarDe.triggerEventHandler('newSearchedElement', "testcity");
    tick();

    expect(component.newRequestedCity).toEqual("testcity");

  }));

});
