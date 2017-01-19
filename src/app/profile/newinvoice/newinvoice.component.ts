import { Component, OnInit, Inject } from '@angular/core';
import { InvoicegeneratorService } from '../../invoicegenerator.service';
import { FirebaseListObservable } from 'angularfire2';
import { PersonalInfo } from '../personal-info/data';
import { Router } from '@angular/router';

declare var jsPDF: any; // Important 

@Component({
  selector: 'app-newinvoice',
  templateUrl: './newinvoice.component.html',
  styleUrls: ['./newinvoice.component.css'],
  providers: [
    { provide: 'Window', useValue: window },
    InvoicegeneratorService
  ]
})
export class NewinvoiceComponent implements OnInit {
  doc = new jsPDF('p', 'pt');
  public boxes: any[] = [];
  public text: string = "";
  public items: any[];
  public personalInfo: FirebaseListObservable<any[]>;
  public num: number = 0;
  public data: any = {};
  private rows: any[] = [];
  private rows3: any[] = [];
  invoice: FirebaseListObservable<any>;
  /*
  rows2 = [
    ["- Mantenimiento y mejora continua.", "- $87,500"],
    ["- Carga de casos.", "- $87,500"],
    ["- Cuatro publicaciones semanales en redes sociales.", "- $175,000"]
  ];
  */
  //public personalInfo: any;


  constructor( @Inject('Window') private window: Window, public is: InvoicegeneratorService,  private router: Router) {
    this.personalInfo = is.getPersonalInfo(true, is.user.uid);
    this.invoice = is.getInvoice(false);

  }
  ngOnInit() { }

  alignCenter(text, y) {
    return this.doc.text((this.doc.internal.pageSize.width / 2) - (this.doc.getTextWidth(text) / 2), y, text);
  }

  generatePdf(personalInfo) {
    console.log(personalInfo);
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
    let deudor: string = this.data.deudor;
    let deudorNit: string = 'NIT ' + this.data.deudorNit;
    let destino: string = personalInfo.nombre;
    let destinoCc: string = 'C.C. ' + personalInfo.cedula;
    let total: string = 'La suma de: ' + this.data.total;
    let concepto: string = 'Por concepto de ' + this.data.concepto + ' para:';

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
    this.doc.autoTable(columns1, this.data.items, {
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
    this.doc.text(20, 270, this.is.user.google.email);
    this.doc.save('table.pdf');
  }

  prueba(): void {

    /*document.getElementById("prueba").innerHTML =`
    <label>Label de prueba
    <input type="text" value="prueba"></input>
    </label>
    `;
    */
    this.num++;
    this.boxes.push({
      texto: "",
      precio: ""
    });
    console.log(this.boxes);
    
    this.boxes.forEach(element => {
      this.rows.push([
        element.texto,
        element.precio
      ]
      );
    });
    //document.getElementById("item").innerHTML=`<label>Label de prueba<input type="text" value="prueba"></input></label>`;

  }

  imprimir(box) {

  }
  
  guardar(name, deudor, deudorNit, total, concepto) {
    this.boxes.forEach(element => {
      this.rows3.push([
        element.texto,
        element.precio
      ]
      );
    });
    this.data = {
      name: name,
      id: this.is.user.uid,
      deudor: deudor,
      deudorNit: deudorNit,
      total: total,
      concepto: concepto,
      items: this.rows3
    };
//    return this.invoice.push(deudor, deudorNit,total, concepto, this.boxes);
    return this.is.pushInvoice(this.data).then(() => {
      this.router.navigate(['/user']);
    });;
  }
}