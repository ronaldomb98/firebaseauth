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
    console.log(this.items.toArray.length.toPrecision());


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

  alignCenter(text, y) {
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


    /*let rows2 = [
      ["- Mantenimiento y mejora continua.", "- $87,500"],
      ["- Carga de casos.", "- $87,500"],
      ["- Cuatro publicaciones semanales en redes sociales.", "- $175,000"]
    ];
    */
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

}

