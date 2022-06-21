import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Usuario} from "../interfaces/usuario.interface";
import {map, Observable, of, tap} from "rxjs";

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
            localStorage.setItem("token", this._usuarioActivo.id.toString());
          }
        })
      );
  }

  public verificarToken() : Observable<boolean> {
    //Si no está guardado, devolvemos un false
    if (!localStorage.getItem('token')) {
      return of(false); //Así devolvemos un observable de boolean
    }

    //Y si está guardado, debemos devolver true, peeeero...
    //SOLO si esa id existe realmente, por lo que hacemos la consulta
    const idUsuarioActivo = localStorage.getItem('token'); //Sacamos del localStorage la id del usuario
    const url = `http://localhost:3000/usuarios/${idUsuarioActivo}`;
    return this._http.get<Usuario>(url)
      .pipe(
        map( (usuario) => {
          this._usuarioActivo = usuario;
          return true;
        })
      );
  }


  public logout() :void {
    this._usuarioActivo = undefined;
    localStorage.removeItem("token");
  }
}
