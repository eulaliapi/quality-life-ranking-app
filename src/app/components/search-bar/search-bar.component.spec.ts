import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  
  let sectionEl: DebugElement;
  let divEl: DebugElement;
  let h1El: DebugElement;
  let formEl: DebugElement;
  let labelEl: DebugElement;
  let inputEl: DebugElement;
  let btnEl: DebugElement;
  let btnIcon: DebugElement;

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

    sectionEl = fixture.debugElement.query(By.css('section'));
    divEl = fixture.debugElement.query(By.css('div'));
    h1El = fixture.debugElement.query(By.css('h1'));

    formEl = fixture.debugElement.query(By.css('form'));
    labelEl = fixture.debugElement.query(By.css('label'));
    inputEl = fixture.debugElement.query(By.css('input'));
    btnEl = fixture.debugElement.query(By.css('button'));
    btnIcon = fixture.debugElement.query(By.css('i'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('HTML Content', () => {

    it('should contain a <section> element populated with a <div> which should be populated with a <h1> and a <form> tag', () => {
      expect(sectionEl).toBeDefined();
      expect(sectionEl.nativeElement.children[0]).toBe(divEl.nativeNode);

      expect(divEl.nativeElement.children[0]).toBe(h1El.nativeNode);
      expect(h1El.nativeElement.textContent).toBe("Learn about the quality of life city ranking.");
      expect(divEl.nativeElement.children[1]).toBe(formEl.nativeNode);
    });

    describe('form', () => {

      it('should contain a <label> tag, an <input> tag and a <button> in this order', () => {
        expect(formEl.nativeElement.children[0]).toBe(labelEl.nativeNode);
        expect(labelEl.nativeElement.textContent).toBe("Insert the name of the city here:");
        expect(formEl.nativeElement.children[1]).toBe(inputEl.nativeNode);
        expect(formEl.nativeElement.children[2]).toBe(btnEl.nativeNode);
        expect(btnEl.nativeElement.children[0]).toBe(btnIcon.nativeNode);
        expect(btnIcon.nativeElement.classList.value).toBe("fa-solid fa-search");
      });

      it('<input> value should be submitted', () => {
        spyOn(component, 'onSubmit')

        formEl.triggerEventHandler('ngSubmit', null);
        fixture.detectChanges();
        expect(component.onSubmit).toHaveBeenCalled();
      })

    });

    it('should emit when submitted', () => {
      spyOn(component, 'onSubmit');
      spyOn(component.newSearchedElement, 'emit');


      btnEl.nativeElement.click();
      expect(component.onSubmit).toHaveBeenCalled();
      fixture.detectChanges();
      expect(component.newSearchedElement.emit).toHaveBeenCalled()

    });

  });







});
