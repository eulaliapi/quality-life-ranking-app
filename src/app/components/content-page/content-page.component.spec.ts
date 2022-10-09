import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ContentPageComponent } from './content-page.component';

xdescribe('ContentPageComponent', () => {
  let component: ContentPageComponent;
  let fixture: ComponentFixture<ContentPageComponent>;

  @Component({
    selector: 'app-city-list',
    template: '<p>Mock app-city-list</p>',
  })
  class MockCityListComponent {}

  @Component({
    selector: 'app-info-message',
    template: '<p>Mock app-info-message</p>',
  })
  class MockInfoMessageComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentPageComponent, MockCityListComponent, MockInfoMessageComponent ],
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

  it('should contain a div tag', () => {
    const divEl = fixture.debugElement.query(By.css('div'));
    expect(divEl).toBeDefined();
  });

});