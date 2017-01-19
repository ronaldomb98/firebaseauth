import {Injectable} from '@angular/core';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {CanActivate} from '@angular/router';
import {InvoicegeneratorService} from './invoicegenerator.service';
 
@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private auth: InvoicegeneratorService, private router: Router){
        
    }
    
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(this.auth.af.auth.getAuth()){
            console.log('AUTH GUARD PASSED');
            return true;
        } else {
            console.log('BLOCKED BY AUTH GUARD');
            this.router.navigate(['/']);
            return false;
        }
    }
}