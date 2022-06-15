import { Component, OnInit } from '@angular/core';
import {Rol, Usuario} from "../../shared/interfaces/usuario.interface";
import {UsuariosService} from "../../shared/services/usuarios.service";
import {ConfirmationService, MessageService, PrimeIcons} from "primeng/api";
import {HttpErrorResponse} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidadorService} from "../../shared/services/validador.service";

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
  public estoyModificando: boolean;
  public mostrandoDialogoUsuario: boolean;

  //Formulario Reactivo Usuario
  public formUsuario: FormGroup;


  constructor(
    private _usuariosService: UsuariosService,
    private _mensajesService: MessageService,
    private _confirmarService: ConfirmationService,
    private _formBuilder : FormBuilder,
    private _validacionService: ValidadorService
  ) {
    this.procesoCargaListaUsuarios = false;
    this.procesoBorrando = false;
    this.procesoGuardando = false;
    this.mostrandoDialogoUsuario = false;
    this.estoyModificando = false;

    this.usuario = <Usuario>{};
    this.rolesDisponibles = [
      {id: 1, rol: 'administrador'},
      {id: 2, rol: 'usuario'},
      {id: 3, rol: 'visor'}
    ]; //TODO: Usar el método del servicio .getAllRoles() para rellenar este array

    //Inicializamos el Formulario Reactivo
    const regexClave = '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'; //al menos 8 dígitos, 1 mayúscula, 1 minúscula y un número y permite carácteres especiales
    this.formUsuario = this._formBuilder.group({
      id: [ null, [Validators.required, Validators.min(1)]],
      nombre : ['', [Validators.required, this._validacionService.validacionNombre ]],
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.pattern(regexClave)]],
      rol: [this.rolesDisponibles[1]]
    });
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

  public mostrarDialogoFormularioUsuario(editar?:boolean){
    //Si es un usuario nuevo, reseteo, si no, no hago nada
    if (!editar) {
      this.estoyModificando = false;
      this.formUsuario.reset({
        rol: this.rolesDisponibles[1]
      }); // Pone todos los valores por defecto
    } else {
      this.estoyModificando = true;
    }
    this.mostrandoDialogoUsuario = true;
  }

  public ocultarDialogoFormularioUsuario() {
    this.mostrandoDialogoUsuario = false;
  }

  public guardarUsuario(usuario: Usuario){
    this.procesoGuardando = true;
    //Si pulsó el lápiz de editar... estamos editando, y si no es que queremos guardar uno nuevo
    if (this.estoyModificando) {
      this._usuariosService.modify(usuario).subscribe({
        next: (resp) => {
          this._mensajesService.add({
            severity: 'success',
            summary: 'Usuario modificado',
            detail: `Se modificó correctamente el usuario "${resp.nombre}"`,
            life: 2000
          });
          this.procesoGuardando = false;
          this.ocultarDialogoFormularioUsuario();
          this.cargarDatos();
          this.estoyModificando = false;
        },
        error: (error: HttpErrorResponse) => {
          this._mensajesService.add({
            severity: 'error',
            summary: "Error",
            detail: error.message
          });
          this.procesoGuardando = false;
          this.estoyModificando = false;
          //Podríamos cerrar la ventana de diálogo, pero mejor se la dejamos abierta y que
          //vuelva a intentar la petición si quiere, o que la cierre si no.
        }
      });
    } else {
      this._usuariosService.add(usuario).subscribe({
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
    }
  }

  public editarUsuario(usuario: Usuario) {
    //Como el objeto usuario tiene una propiedad (admin) que no está definida en el formulario, podemos:
    //-Definirla en el formulario
    //-Borrarla en el objeto (para borrar una propiedad, ésta debe declararse como opcional en su interfaz con '?'
    delete usuario.admin;
    this.formUsuario.setValue(usuario); //Volcamos el objeto Usuario que queremos modificar en el formulario
    this.mostrarDialogoFormularioUsuario(true);
  }

  public formularioUsuarioEnviado() {
    if (this.formUsuario.valid) {
      this.guardarUsuario(this.formUsuario.value);
    } else{
      this.formUsuario.markAllAsTouched();
    }
  }

  public esCampoInvalido(nombreControl: string) : boolean {
    return this.formUsuario.controls[nombreControl].invalid && this.formUsuario.controls[nombreControl].touched;
  }
  public esCampoValido(nombreControl: string) : boolean {
    return !this.esCampoInvalido(nombreControl);
  }
}
