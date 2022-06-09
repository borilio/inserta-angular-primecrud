import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Usuario} from "../interfaces/usuario.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private _http : HttpClient
  ) { }

  public getAll() : Observable<Usuario[]>{
    const url = `http://localhost:3000/usuarios`;
    return this._http.get<Usuario[]>(url);
  }


}
