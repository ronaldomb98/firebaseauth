import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { InvoicegeneratorService } from '../../invoicegenerator.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'],
  providers: [InvoicegeneratorService]
  
  
})
export class BaseComponent implements OnInit {


  constructor(public af: AngularFire, public igs: InvoicegeneratorService, private router: Router) {
      
   }

  ngOnInit() {
    
}

}
