import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../shared/interfaces/usuario.interface";
import {UsuariosService} from "../../shared/services/usuarios.service";
import {ConfirmationService, MessageService, PrimeIcons} from "primeng/api";

@Component({
  selector: 'app-page-usuarios',
  templateUrl: './page-usuarios.component.html',
  styleUrls: ['./page-usuarios.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class PageUsuariosComponent implements OnInit {

  public listaUsuarios? : Usuario[];
  public cargando: boolean;
  public borrando: boolean;
  public mostrandoDialogoUsuario: boolean;

  constructor(
    private _usuariosService: UsuariosService,
    private _mensajesService: MessageService,
    private _confirmarService: ConfirmationService
  ) {
    this.cargando = false;
    this.borrando = false;
    this.mostrandoDialogoUsuario = false;
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  public cargarDatos() {
    this.cargando = true; //para mostrar la barra
    this._usuariosService.getAll().subscribe(
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

  public confirmarBorradoUsuario(usuario: Usuario, event: Event ){
    this._confirmarService.confirm({
      target: event.target as EventTarget,
      message: "¿Estás seguro de borrar el usuario?",
      icon: PrimeIcons.EXCLAMATION_CIRCLE,
      acceptLabel: "Si",
      acceptIcon: PrimeIcons.CHECK,
      rejectLabel: "No",
      rejectIcon: PrimeIcons.TIMES,
      accept: () => {
        this.eliminarUsuario(usuario);
      },
      reject: () => {
        this._mensajesService.add({
          severity: "info",
          detail: "Cancelado el borrado"
        });
      }
    });
  }

  public eliminarUsuario(usuario: Usuario){
    this.borrando = true;
    this._usuariosService.deleteById(usuario.id).subscribe({
      next: (resp) => {
        this._mensajesService.add({
          severity: "success",
          summary: "Borrado",
          detail: `El usuario ${usuario.nombre} ha sido borrado satisfactoriamente`,
        });
        this.cargarDatos();
        this.borrando = false;
      },
      error: (error) => {
        this._mensajesService.add({
          severity: "error",
          summary: "Error",
          detail: `Error al intentar borrar el usuario ${usuario.nombre}`
        });
        this.borrando = false;
      }
    });


  }

  public mostrarDialogoFormularioUsuario(){
    this.mostrandoDialogoUsuario = true;

  }

  public ocultarDialogoFormularioUsuario() {
    this.mostrandoDialogoUsuario = false;
  }
}
