import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { InvoicegeneratorService } from '../../invoicegenerator.service';

declare var jsPDF: any; // Important 

@Component({
  selector: 'app-savedfiles',
  templateUrl: './savedfiles.component.html',
  styleUrls: ['./savedfiles.component.css'],
  providers: [InvoicegeneratorService]

})
export class SavedfilesComponent implements OnInit {
  doc = new jsPDF('p', 'pt');
  isCollapsed: boolean;
  items: FirebaseListObservable<any>;
  public personalInfo: FirebaseListObservable<any[]>;
  name: string;
  key: string;
  nombre: string;
  user: any;

  constructor(public is: InvoicegeneratorService) {
    this.isCollapsed = true
    this.items = is.getInvoice(true, is.user.uid);
    this.personalInfo = is.getPersonalInfo(true, is.user.uid);
    this.name = "";
    


  }

  ngOnInit() {

  }

  public capturaDatos(key, nombre) {
    this.key = key;
    this.isCollapsed = !this.isCollapsed;
  }

  public updateName() {
    var datosActualizar = {
      name: this.name
    }
    this.items.update(this.key, datosActualizar);
  }

  public deleteDatos(key) {
    this.items.remove(key)
  }

  public addDatos(nombre) {
    var nuevo = {
      id: this.is.user.uid,
      name: nombre
    }
    this.items.push(nuevo);
    var prueba;
    this.items.subscribe(data => {
      prueba = data
    });
    console.log(prueba.length);
  }

  private descargar(data, personalInfo) {
    this.is.descargar(data, personalInfo);
  }

}

