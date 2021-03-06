import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { InvoicegeneratorService } from './invoicegenerator.service';
import { HomeComponent } from './components/home/home.component';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth: InvoicegeneratorService, private router: Router) {

    }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let flag;
        this.auth.af.auth.subscribe(auth => {
            if (!auth) {
                console.log('BLOCKED BY AUTH GUARD');
                this.router.navigate(['/']);
                flag = false;
            } else {
                flag = true;
            }
        });
        return flag;

    }
}