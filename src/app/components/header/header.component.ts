import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoicegeneratorService } from '../../invoicegenerator.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [InvoicegeneratorService]
})
export class HeaderComponent implements OnInit {
  
  constructor(private igs: InvoicegeneratorService) { }

  ngOnInit() {
  }

  ngDoCheck(){
    
  }

}
