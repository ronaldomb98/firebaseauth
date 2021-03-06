import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { InvoicegeneratorService } from '../../invoicegenerator.service';
import { MessageControlService } from '../../message-control.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css'],
  providers: [InvoicegeneratorService]
})
export class PersonalInfoComponent implements OnInit {
  personalInfo: FirebaseListObservable<any>;
  info: any[];
  _infoActua: boolean = true;
  static _mensaje: string;
  mensaje: string;
  constructor(public is: InvoicegeneratorService, private router: Router, private messageControl: MessageControlService) {

    this.personalInfo = this.is.getPersonalInfo(true, this.is.user.uid);
  }

  ngOnInit() {

  }

  ngDoCheck() {
    this.mensaje = this.messageControl.mensaje;
    this._infoActua = this.messageControl.flag;
  }

  actualizar(key, nombre, cedula, direccion, telefono, cuenta, banco, email) {
    //console.log(key + nombre + cedula + direccion + telefono + cuenta + banco + email);
    let data = {
      nombre: nombre,
      cedula: cedula,
      direccion: direccion,
      telefono: telefono,
      cuenta: cuenta,
      banco: banco,
      email: email
    }
    console.log(data);
    this.is.updatePersonalInfo(key, data);
    this.messageControl.flag = true;
    this.router.navigate(['/user']);
  }



}
