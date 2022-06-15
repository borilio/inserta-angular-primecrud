import { Injectable } from '@angular/core';
import {FormControl, ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidadorService {

  constructor() { }

  //TODO: Aquí irían las validaciones personalizadas que queramos usar en los formularios reactivos

  public validacionNombre(control: FormControl) : ValidationErrors | null {
    const valor = control.value || '';
    let error = null;
    if (valor.length < 3) {
      error = { longitudMin: true };
    }
    return error;
  }
}
