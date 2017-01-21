import { Component } from '@angular/core';
import { InvoicegeneratorService } from './invoicegenerator.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(is: InvoicegeneratorService) {}
}