import { Injectable } from '@angular/core';

@Injectable()
export class MessageControlService {
  private _mensaje: string;
  private _cantPi: number;
  private _flag: boolean;
  constructor() { }
  
  get mensaje(): string{
    return this._mensaje
  }

  set mensaje(mensaje: string){
    this._mensaje = mensaje
  }

  get cantPi(): number{
    return this._cantPi;
  }

  set cantPi(cantPi: number){
    this._cantPi = cantPi
  }

  get flag(): boolean{
    return this._flag;
  }

  set flag(flag: boolean){
    this._flag = flag
  }
}
