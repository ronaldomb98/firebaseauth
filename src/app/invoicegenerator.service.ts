import { Injectable, ViewChild } from '@angular/core';
import { AngularFire, AngularFireModule, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PersonalInfoComponent } from './profile/personal-info/personal-info.component';
import { PersonalInfo } from './profile/personal-info/data';
import "rxjs/add/operator/filter";
import "rxjs/add/operator/first";
import "rxjs/Subscriber";

import { MessageControlService } from './message-control.service';

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
  public _mensaje: string;
  public _infoActua: boolean;
  public num: any;
  constructor(public af: AngularFire, private router: Router, private messageControl: MessageControlService) {
    this.loadUser();

  }

  public getPersonalInfo(specific: boolean, id?: string) {
    if (specific == true) {
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

  public updatePersonalInfo(key, data) {
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

  public getItems() {
    return this.items;
  }

  login() {
    this.af.auth.login().then(
      () => {
        let prueba: number;
        this.getPersonalInfo(true, this.user.uid).subscribe(data => {
          prueba = data.length;
          if (prueba == 0) {
            if(this.messageControl.cantPi == null){
            this.pushPersonalInfo(this.getArrayPI(this.user.google.displayName, this.user.google.email));
            }
            this.messageControl.mensaje = "Para completar su registro, porfavor diligencie el formulario";
            this.messageControl.cantPi = 0;
            this.messageControl.flag = false;
          } else {
            this.messageControl.mensaje = "";
            this.messageControl.cantPi = 1;
            this.messageControl.flag = true;
          }
        });
      }
    ).then(
      () => {
            this.router.navigate(['/user/personalinfo']);
      }
      ).catch((error) => {
        console.log(error)
      });


  }

  valid() {
    var flag: boolean;
    this.getPersonalInfo(true, this.user.google.uid).subscribe((info) => {
      if (info.length == 0) { flag = true }
    }
    );
    console.log(flag);

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
      font: "arial", // helvetica, times, courier
      fontStyle: 'normal', // normal, bold, italic, bolditalic
      halign: 'center', // left, center, right 
      valign: 'middle' // top, middle, bottom 
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

  public get getMensaje() {
    return this._mensaje;
  }

  public get getInfoActua() {
    return this._infoActua;
  }
  public set setMensaje(mensaje) {
    this._mensaje = mensaje;
  }
  public set setInfoActua(infoActua) {
    this._infoActua = infoActua;
  }
}
