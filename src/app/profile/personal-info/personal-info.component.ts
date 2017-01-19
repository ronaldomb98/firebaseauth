import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { InvoicegeneratorService } from '../../invoicegenerator.service';
@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css'],
  providers: [InvoicegeneratorService]
})
export class PersonalInfoComponent implements OnInit {
  personalInfo: FirebaseListObservable<any>;
  info: any[];
  constructor(public is: InvoicegeneratorService) {
    this.personalInfo = is.getPersonalInfo(true, is.user.uid);
  }

  ngOnInit() {
  }

  actualizar($key , nombre, cedula, direccion, telefono, cuenta, banco, email){
    this.is.updatePersonalInfo($key, nombre, cedula,direccion,telefono,cuenta,banco, email)
      .then(
        (data) => {
          console.log("data actualizada");
        }
      );
  }
  

}
