import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../components/base/base.component';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  viewProviders: [BaseComponent]
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
