import { Component, Input, } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageComponent } from './landing-page.component';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  @Component({
    selector: 'app-search-bar',
    template: '<p></p>',
  })
  class MockSearchBarComponent { }

  @Component({
    selector: 'app-content-page',
    template: '<p>Mock app-content-page</p>',
  })
  class MockContentPageComponent {
    @Input() requestedCity!: string;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPageComponent, MockSearchBarComponent, MockContentPageComponent ]
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
    expect(MockSearchBarComponent).toBeTruthy();
    expect(MockContentPageComponent).toBeTruthy();
  });

  xit('getRequestedCity() should set its parameter to newRequestedCity', () => {
    
  });
});
