import { Component, OnInit } from '@angular/core';
import {Rol, Usuario} from "../../shared/interfaces/usuario.interface";
import {UsuariosService} from "../../shared/services/usuarios.service";
import {ConfirmationService, MessageService, PrimeIcons} from "primeng/api";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-page-usuarios',
  templateUrl: './page-usuarios.component.html',
  styleUrls: ['./page-usuarios.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class PageUsuariosComponent implements OnInit {

  //Modelos
  public listaUsuarios? : Usuario[];
  public usuario: Usuario;
  public rolesDisponibles: Rol[];

  //Switches mientras dura un proceso (peticiones http)
  public procesoCargaListaUsuarios: boolean;
  public procesoBorrando: boolean;
  public procesoGuardando: boolean;


  //Ventana de diálogo Formulario Usuario
  public mostrandoDialogoUsuario: boolean;


  constructor(
    private _usuariosService: UsuariosService,
    private _mensajesService: MessageService,
    private _confirmarService: ConfirmationService
  ) {
    this.procesoCargaListaUsuarios = false;
    this.procesoBorrando = false;
    this.procesoGuardando = false;
    this.mostrandoDialogoUsuario = false;

    this.usuario = <Usuario>{};
    this.rolesDisponibles = [
      {id: 1, rol: 'administrador'},
      {id: 2, rol: 'usuario'},
      {id: 3, rol: 'visor'}
    ]; //TODO: Usar el método del servicio .getAllRoles() para rellenar este array
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  public cargarDatos() {
    this.procesoCargaListaUsuarios = true; //para mostrar la barra
    this._usuariosService.getAll().subscribe(
      {
        next: (resp) => {
          this.listaUsuarios = resp;
          this.procesoCargaListaUsuarios = false;
        },
        error: (error) => {
          this._mensajesService.add({
            severity : "error",
            summary: "Error",
            detail: "Hubo un error al obtener los datos del API",
            sticky: true
          });
          this.procesoCargaListaUsuarios = false;
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
    this.procesoBorrando = true;
    this._usuariosService.deleteById(usuario.id).subscribe({
      next: (resp) => {
        this._mensajesService.add({
          severity: "success",
          summary: "Borrado",
          detail: `El usuario ${usuario.nombre} ha sido borrado satisfactoriamente`,
        });
        this.cargarDatos();
        this.procesoBorrando = false;
      },
      error: (error) => {
        this._mensajesService.add({
          severity: "error",
          summary: "Error",
          detail: `Error al intentar borrar el usuario ${usuario.nombre}`
        });
        this.procesoBorrando = false;
      }
    });


  }

  public mostrarDialogoFormularioUsuario(){
    this.mostrandoDialogoUsuario = true;

  }

  public ocultarDialogoFormularioUsuario() {
    this.mostrandoDialogoUsuario = false;
  }

  public guardarUsuario(){
    this.procesoGuardando = true;
    this._usuariosService.add(this.usuario).subscribe({
      next: (resp) => {
        this._mensajesService.add({
          severity: 'success',
          summary: 'Usuario añadido',
          detail: `Se añadió correctamente el usuario "${resp.nombre}"`,
          life: 2000
        });
        this.procesoGuardando = false;
        this.ocultarDialogoFormularioUsuario();
        this.cargarDatos();
      },
      error: (error: HttpErrorResponse) => {
        this._mensajesService.add({
          severity: 'error',
          summary: "Error",
          detail: error.message
        });
        this.procesoGuardando = false;
        //Podríamos cerrar la ventana de diálogo, pero mejor se la dejamos abierta y que
        //vuelva a intentar la petición si quiere, o que la cierre si no.
      }
    });
    //TODO: Cuando hagamos una modificación, deberemos llamar a .modify() en lugar de .add()
  }

  public editarUsuario(usuario: Usuario) {
    this.usuario = usuario;
    this.mostrarDialogoFormularioUsuario();
  }
}
