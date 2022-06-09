import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../shared/interfaces/usuario.interface";
import {UsuariosService} from "../../shared/services/usuarios.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-page-usuarios',
  templateUrl: './page-usuarios.component.html',
  styleUrls: ['./page-usuarios.component.css'],
  providers: [MessageService]
})
export class PageUsuariosComponent implements OnInit {

  public listaUsuarios? : Usuario[];
  public cargando: boolean;

  constructor(
    private _usuariosService: UsuariosService,
    private _mensajesService: MessageService
  ) {
    this.cargando = false;

  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  public cargarDatos() {
    this.cargando = true; //para mostrar la barra
    this._usuariosService.getUsuarios().subscribe(
      {
        next: (resp) => {
          this.listaUsuarios = resp;
          this.cargando = false;
        },
        error: (error) => {
          this._mensajesService.add({
            severity : "error",
            summary: "Error",
            detail: "Hubo un error al obtener los datos del API",
            sticky: true
          });
          this.cargando = false;
        }
      }
    );


  }

  public eliminarUsuario(){
    this._mensajesService.add({
      severity: "info",
      summary: "Prueba",
      detail: "Estamos probando los toast..."
    });
  }
}
