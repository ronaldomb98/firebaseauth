import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  //viewProviders: [BaseComponent]
})
export class HomeComponent implements OnInit {

  constructor() {
//    BaseComponent.call
  }

  ngOnInit() {
  }

}
