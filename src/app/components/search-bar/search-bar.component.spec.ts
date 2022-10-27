import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  let testForm =<NgForm>{
    value: {
      city: "testCity  "
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
      imports: [FormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('HTML Content', () => {

    it('should contain a <div> which should contain a <form>', () => {

      let formContainer = fixture.debugElement.query(By.css('div'));
      let form = fixture.debugElement.query(By.css('form'));

      expect(formContainer).toBeTruthy();
      expect(formContainer.children[1]).toBe(form);
    });

    describe('form', () => {

      it('should contain a label, an input and a button in this order', () => {

        let form = fixture.debugElement.query(By.css('form'));
        let label = fixture.debugElement.query(By.css('label'));
        let input = fixture.debugElement.query(By.css('input'));
        let button = fixture.debugElement.query(By.css('button'));

        expect(form).toBeTruthy();
        expect(label).toBeTruthy();
        expect(input).toBeTruthy();
        expect(button).toBeTruthy();

        expect(form.children[0]).toBe(label);
        expect(form.children[1]).toBe(input);
        expect(form.children[2]).toBe(button);
      });

      it('label for attribute should equal input id', () => {
        let label = fixture.debugElement.query(By.css('label'));
        let input = fixture.debugElement.query(By.css('input'));

        expect(label.attributes['for']).toEqual(input.attributes['id']);
      });

    });

  });

  it('should call onSubmit() when form is submitted', () => {
    let spyOnSubmit = spyOn(component, 'onSubmit');

    let form = fixture.debugElement.query(By.css('form'));

    form.triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();
    expect(spyOnSubmit).toHaveBeenCalledTimes(1);

    spyOnSubmit(testForm);
    expect(spyOnSubmit).toHaveBeenCalledWith(testForm);

  });

  it('should output a string when onSubmit() is called', () => {
    let buttonDe = fixture.debugElement.query(By.css('.button'));
    let emittedString: string | undefined;
    let expectedString = "testcity";

    buttonDe.triggerEventHandler('submit', null);

    component.newSearchedElement.subscribe((data: string) => emittedString = data );
    expect(emittedString).toEqual(expectedString);
    
  });

});
