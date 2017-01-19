import { Injectable } from '@angular/core';
import { AngularFire, AngularFireModule, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PersonalInfo } from './profile/personal-info/data';


// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyCTNcoyeUO-0G0x42hj0T3K5o2Y9T_kxy4',
  authDomain: 'fir-invoicegenerator.firebaseapp.com',
  databaseURL: 'https://fir-invoicegenerator.firebaseio.com',
  storageBucket: 'fir-invoicegenerator.appspot.com',
  messagingSenderId: '279649067231'
};

export const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup,

};



@Injectable()
export class InvoicegeneratorService {
  items: FirebaseListObservable<any>;
  personalInfo: FirebaseListObservable<PersonalInfo[]>;
  user: any;
  public cero: number = 0;
  constructor(public af: AngularFire, private router: Router) {
    this.loadUser();
  }

  public getPersonalInfo(specific: boolean, id?: string) {
    if (specific == true) {
      console.log("esta es la info de getPersonalInfo() " + specific + "" + id);
      return this.af.database.list('user', {
        query: {
          orderByChild: 'id',
          equalTo: id
        }
      });
    } else {
      return this.af.database.list('user');
    }
  }

  public updatePersonalInfo(key, nombre, cedula, direccion, telefono, cuenta, banco, email) {
    let data = {
      nombre: nombre,
      cedula: cedula,
      direccion: direccion,
      telefono: telefono,
      cuenta: cuenta,
      banco: banco,
      email: email
    }
    return this.getPersonalInfo(false).update(key, data)
  }

  public pushPersonalInfo(personalInfo) {
    return this.getPersonalInfo(false).push(personalInfo);
  }



  public listData() {
    return this.af.database.list('/items')
  }

  public listById(id) {
    return this.af.database.list('items', {
      query: {
        orderByChild: 'id',
        equalTo: id
      }
    })
  }

  public pushData(newName) {
    return this.items.push({ name: newName });
  }

  public updateData() {

  }

  public deleteData() {

  }

  public getItems() {
    return this.items;
  }
  /*
  prueba() {
    let prueba: number;
    let flag: boolean;
    this.getPersonalInfo(true, this.user.uid).subscribe(data => {
      console.log("El id del usuario es: " + this.user.uid);
      prueba = data.length;
      if (prueba == 0) {
        flag = false;
      } else {
        flag = true;
      }
    });
    return flag;
  }
  */
  login() {
    this.af.auth.login().then(
      //crea el espacio en la base de datos con datos vacios
      () => {
        let prueba: number;
        this.getPersonalInfo(true, this.user.uid).subscribe(data => {
          prueba = data.length;
          if (prueba == 0) {
            this.pushPersonalInfo(this.getArrayPI(this.user.google.displayName, this.user.google.email));
            console.log("se ha creado un espacio en user");
          } else {
            console.log("El usuario ya tiene espacio en user");
          }
        });
      }
    ).then(
      (userLoged) => {
        this.router.navigate(['/user']);
      }
      ).catch((error) => {
        console.log(error)
      });

  }
  logout() {
    this.af.auth.logout();

  }
  loadUser() {
    this.af.auth.subscribe(auth => {
      this.user = auth;

    });
  }

  private getArrayPI(nombre, email) {
    let data = {
      id: this.user.uid,
      nombre: nombre,
      cedula: "",
      direccion: "",
      telefono: "",
      cuenta: "",
      banco: "",
      email: email
    };
    return data;
  }

  

  public pushInvoice(data) {
    return this.getInvoice(false).push(data);
  }

  public getInvoice(specific: boolean, id?: string) {
    if (specific == true) {
      console.log("esta es la info de getInvoice() " + specific + "" + id);
      return this.af.database.list('invoice', {
        query: {
          orderByChild: 'id',
          equalTo: id
        }
      });
    } else {
      return this.af.database.list('invoice');
    }
  }
}
