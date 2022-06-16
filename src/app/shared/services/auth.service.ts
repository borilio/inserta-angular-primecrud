import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Usuario} from "../interfaces/usuario.interface";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuarioActivo: Usuario | undefined;

  constructor(private _http: HttpClient) { }

  get usuarioActivo() {
    return {...this._usuarioActivo!};
  }

  public autorizar(correo: string, clave:string) : Observable<Usuario[]> {
    const url = `http://localhost:3000/usuarios?correo=${correo}&clave=${clave}`;
    return this._http.get<Usuario[]>(url)
      .pipe(
        tap((resp) => {
          console.log("Interceptamos la respuesta del observable", resp);
          if (resp.length > 0) {
            this._usuarioActivo = resp[0];
          }
        })
      );
  }

  public logout() :void {
    this._usuarioActivo = undefined;
  }
}
