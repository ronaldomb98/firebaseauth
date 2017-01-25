import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { InvoicegeneratorService } from '../../invoicegenerator.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  viewProviders: [HeaderComponent],
  providers: [InvoicegeneratorService]
})
export class UserComponent implements OnInit {

  constructor(private is: InvoicegeneratorService) { }

  ngOnInit() {
  }

}
