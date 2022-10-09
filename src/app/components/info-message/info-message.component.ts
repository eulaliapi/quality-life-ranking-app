import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-info-message',
  templateUrl: './info-message.component.html',
  styleUrls: ['./info-message.component.css']
})
export class InfoMessageComponent implements OnInit {

  @Input() showList: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }



}
