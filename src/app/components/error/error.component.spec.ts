import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ErrorComponent } from './error.component';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;
  let routerSpy = { navigate: jasmine.createSpy('navigate')}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorComponent ],
      imports: [ RouterTestingModule],
      providers: [{provide: Router, useValue: routerSpy}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('goToMain() should lead the user to landing-page', () => {

    component.goToMain();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/landing-page']);

  });

  it('should contain div.error-container', () => {
    let divDe = fixture.debugElement.query(By.css('div'));
    let divEl = divDe.nativeElement;

    expect(divEl).toBeDefined();
    expect(divEl).toHaveClass('error-container');
  });

  it('div.error-container should contain h1.heading, a p element, button.arrow-button in this order', () => {
    let divDe = fixture.debugElement.query(By.css('div'));
    let divEl = divDe.nativeElement;

    let h1De = fixture.debugElement.query(By.css('h1'));
    let h1El = h1De.nativeElement;

    let pDe = fixture.debugElement.query(By.css('p'));
    let pEl = pDe.nativeElement;

    let buttonDe = fixture.debugElement.query(By.css('button'));
    let buttonEl = buttonDe.nativeElement;

    expect(divEl.children.length).toBe(3);
    expect(divEl.children[0]).toBe(h1El);
    expect(divEl.children[1]).toBe(pEl);
    expect(divEl.children[2]).toBe(buttonEl);

    expect(h1El).toHaveClass('heading');
    expect(buttonEl).toHaveClass('arrow-button');
    
  });

  it('h1 text content', () => {
    let h1De = fixture.debugElement.query(By.css('h1'));
    let h1El = h1De.nativeElement;

    expect(h1El.innerText).toBe("Sorry!")
  });

  it('p text content', () => {
    let pDe = fixture.debugElement.query(By.css('p'));
    let pEl = pDe.nativeElement;

    expect(pEl.innerText).toBe("The page you requested was not found or another error occured.");
  });

  it('button should call goToMain()', () => {
    spyOn(component, 'goToMain');

    let buttonDe = fixture.debugElement.query(By.css('button'));
    let buttonEl = buttonDe.nativeElement;

    buttonEl.click();
    expect(component.goToMain).toHaveBeenCalled();

  });


});
