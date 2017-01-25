import { Injectable } from '@angular/core';
import { AngularFire, AngularFireModule, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { tokenNotExpired } from 'angular2-jwt';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PersonalInfo } from './profile/personal-info/data';

declare var jsPDF: any; // Important 

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
  private doc = new jsPDF('p', 'pt');
  public items: FirebaseListObservable<any>;
  public personalInfo: FirebaseListObservable<PersonalInfo[]>;
  public user: any;
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

  private alignCenter(text, y) {
    return this.doc.text((this.doc.internal.pageSize.width / 2) - (this.doc.getTextWidth(text) / 2), y, text);
  }

  public descargar(data, personalInfo) {
    this.doc = new jsPDF();
    //propierties
    this.doc.setProperties({
      title: 'Invoice',
      subject: 'Invoice generated',
      author: 'Ronaldo M',
      keywords: 'generated, javascript, invoice',
      creator: 'Ronaldo M'
    });
    //variables

    let deudor: string = data.deudor;
    let deudorNit: string = 'NIT ' + data.deudorNit;
    let destino: string = personalInfo.nombre;
    let destinoCc: string = 'C.C. ' + personalInfo.cedula;
    let total: string = 'La suma de: ' + data.total;
    let concepto: string = 'Por concepto de ' + data.concepto + ' para:';

    //body
    this.doc.setFontSize(11);
    this.doc.setFont('arial');
    this.doc.setFontStyle('bold');
    this.doc.text(125, 20, 'CUENTA DE COBRO No. 0001');
    this.alignCenter(deudor, 30);
    this.alignCenter(deudorNit, 35);
    this.alignCenter('DEBE A', 45);
    this.alignCenter(destino, 50);
    this.alignCenter(destinoCc, 55);
    this.doc.text(20, 70, total);
    this.doc.text(20, 80, concepto);
    let columns1 = ["Item", "Valor"];
    this.doc.autoTable(columns1, data.items, {
      theme: 'plain',
      tableLineColor: 200, // number, array (see color section below) 
      margin: { top: 90, left: 20, right: 20 },
      tableLineWidth: 0.5,
      fontSize: 11,
      font: "arial", // helvetica, times, courier
      fontStyle: 'normal', // normal, bold, italic, bolditalic
      halign: 'center', // left, center, right 
      valign: 'middle', // top, middle, bottom 
    });
    this.doc.setFontStyle('normal');
    this.doc.text(20, 155, 'PERTENEZCO AL RÉGIMEN SIMPLIFICADO');
    this.doc.text(20, 160, 'NO ESTOY OBLIGADO A FACTURAR, NI SOY RESPONSABLE DE IVA');
    this.doc.text(20, 170, 'Cédula de ciudadanía: ' + personalInfo.cedula);
    this.doc.text(20, 180, 'Ciudad y fecha: Ibagué, 30 de octubre de 2016');
    this.doc.text(20, 190, 'Dirección: ' + personalInfo.direccion);
    this.doc.text(20, 200, 'Teléfono: ' + personalInfo.telefono);
    this.doc.text(20, 210, 'Correo Electrónico: ' + personalInfo.correo);
    this.doc.text(20, 220, 'Favor consignar a mi cuenta de ahorros #' + personalInfo.cuenta + ' de ' + personalInfo.banco + '.');
    this.doc.setFontStyle('bold');
    this.doc.text(20, 255, '_________________________________');
    this.doc.text(20, 260, (personalInfo.nombre).toUpperCase());
    this.doc.text(20, 270, personalInfo.cedula);
    this.doc.save('table.pdf');
  }

  public authenticated() {
    return tokenNotExpired();
  }


}
