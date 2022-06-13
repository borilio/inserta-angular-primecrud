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

  public getAllRoles() {
    //TODO: Hacer este método que me devuelva un Observable<Rol[]>
    //y usar este método en el ngOnInit para rellenar el array rolesDisponibles
  }

  public deleteByUsuario(usuario: Usuario) : Observable<Usuario> {
    return this.deleteById(usuario.id);
  }

  public deleteById(id: number) : Observable<Usuario> {
    const url = `http://localhost:3000/usuarios/${id}`;
    return this._http.delete<Usuario>(url);
  }

  public add(usuario: Usuario): Observable<Usuario> {
    const url = `http://localhost:3000/usuarios`;
    return this._http.post<Usuario>(url, usuario);
  }

  public modify(usuario: Usuario): Observable<Usuario> {
    const url = `http://localhost:3000/usuarios/${usuario.id}`;
    return this._http.patch<Usuario>(url, usuario);
  }

}
