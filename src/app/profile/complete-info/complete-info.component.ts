import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { InvoicegeneratorService } from '../../invoicegenerator.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-complete-info',
  templateUrl: './complete-info.component.html',
  styleUrls: ['./complete-info.component.css'],
  providers: [InvoicegeneratorService]
})
export class CompleteInfoComponent implements OnInit {
  personalInfo: FirebaseListObservable<any>;
  info: any[];
  _infoActua: boolean = false;
  _mensaje: string;
  constructor(public is: InvoicegeneratorService, private router: Router) {
    this.personalInfo = this.is.getPersonalInfo(true, this.is.user.uid);
  }

  ngOnInit() {
    
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
    this.is.updatePersonalInfo(key,data);
    this._mensaje = "Informacion Actualizada";
/*
    this.is.updatePersonalInfo(key, nombre, cedula, direccion, telefono, cuenta, banco, email);
    this._mensaje = "Informacion Actualizada";
    setTimeout(() => {
      this.router.navigateByUrl('/user');
    }, 1000);
    */
    

  }

  setMensaje(mensaje) {
    this._mensaje = mensaje;
  }

}
