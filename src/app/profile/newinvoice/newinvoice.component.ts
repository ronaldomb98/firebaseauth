import { Component, OnInit, Inject } from '@angular/core';
import { InvoicegeneratorService } from '../../invoicegenerator.service';
import { FirebaseListObservable } from 'angularfire2';
import { PersonalInfo } from '../personal-info/data';
import { Router } from '@angular/router';

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
  public boxes: any[] = [];
  public text: string = "";
  public items: any[];
  public personalInfo: FirebaseListObservable<any[]>;
  public num: number = 0;
  public data: any = {};
  private rows: any[] = [];
  private rows3: any[] = [];
  invoice: FirebaseListObservable<any>;

  constructor( @Inject('Window') private window: Window, 
                                  private is: InvoicegeneratorService, 
                                  private router: Router) {
    this.personalInfo = is.getPersonalInfo(true, is.user.uid);
    this.invoice = is.getInvoice(false);
    this.prueba();

  }
  ngOnInit() { }

  prueba(): void {
    this.boxes.push({
      texto: null,
      precio: null
    });
    this.boxes.forEach(element => {
      this.rows.push([
        element.texto,
        element.precio
      ]
      );
    });
  }

  guardar(name, deudor, deudorNit, total, concepto) {

    this.data = {
      name: name,
      id: this.is.user.uid,
      deudor: deudor,
      deudorNit: deudorNit,
      total: total,
      concepto: concepto,
      items: this.rows3
    };
    if (!this.data.name ||
      !this.data.deudor ||
      !this.data.deudorNit ||
      !this.data.total ||
      !this.data.concepto ||
      this.noitems() == false) {
      window.alert("Por favor, no deje espacios en blanco.");
      /*
      document.getElementById("faltanDatos").innerHTML=`
        <div class="alert alert-success">
          <strong>Faltan Datos!</strong> Por favor, no deje espacios en blanco.
        </div>
      `;
      */
    } else {
      this.boxes.forEach(element => {
        this.rows3.push([
          element.texto,
          element.precio
        ]
        );
      });
      return this.is.pushInvoice(this.data).then(() => {
        this.router.navigate(['/user']);
      });
    }
  }

  noitems(): boolean {
    let flag: boolean;
    this.boxes.forEach(element => {
      if (!element.texto ||
        element.precio == null) {
        return flag = false;

      } else {
        flag = true;
      }
    });
    return flag;
  }
}