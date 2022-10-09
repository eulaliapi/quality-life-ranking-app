import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { CityItem } from 'src/app/models/cityList.model';
import { CityService } from 'src/app/services/city.service';

import { CityRankingComponent } from './city-ranking.component';

describe('CityRankingComponent', () => {
  let component: CityRankingComponent;
  let fixture: ComponentFixture<CityRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityRankingComponent ],
      imports: [ RouterTestingModule],
      providers: [
        {provide: CityService, useClass: CityServiceStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


class CityServiceStub {
  getUrbanAreaUrl(id: number): Observable<CityItem["href"]> {
    return of('');
  };
};