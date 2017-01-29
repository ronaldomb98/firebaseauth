import { Component, OnInit, ViewChild } from '@angular/core';
import { InvoicegeneratorService } from '../../invoicegenerator.service';
import { PersonalInfoComponent } from '../personal-info/personal-info.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [InvoicegeneratorService]
})
export class UserComponent implements OnInit {

  constructor() {
    
   }

  ngOnInit() {
  }

}
