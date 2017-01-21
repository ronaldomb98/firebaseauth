import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { InvoicegeneratorService } from './invoicegenerator.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth: InvoicegeneratorService, private router: Router) {

    }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        let flag;
        this.auth.af.auth.subscribe(auth => {
            if (auth!= null) {
            
            console.log('AUTH GUARD PASSED');
            flag = true;
        } else {
            console.log('BLOCKED BY AUTH GUARD');
            flag= false;
        }
        });
        return flag;
        
    }
}