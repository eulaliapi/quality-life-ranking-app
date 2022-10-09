import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CityUrbanArea } from 'src/app/models/cityGeoIdInfo.model';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {

  //receives boolean value that shows/doesn't show the list
  @Input() showList: boolean = false;
  @Input() showMsg: boolean = false;
  @Input() cityList?: [CityUrbanArea, number][];

  constructor() { }

  ngOnInit(): void { }
 
}
