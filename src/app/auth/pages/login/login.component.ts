import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Valores del formulario
  public usuario_correo: string;
  public usuario_clave: string;

  constructor(private _router: Router) {
    this.usuario_correo = "";
    this.usuario_clave = "";
  }

  ngOnInit(): void {
  }

  public login() {
    //comprobar el usuario, si existe voy a un sitio, y si no voy a otro
    this._router.navigate(['/usuarios']);

  }

}
