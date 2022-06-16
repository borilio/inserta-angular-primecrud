import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Valores del formulario
  public usuario_correo: string;
  public usuario_clave: string;
  public credencialesNoValidas: boolean;
  public procesoLogin: boolean;



  constructor(private _router: Router, private _authService: AuthService) {
    this.usuario_correo = "";
    this.usuario_clave = "";
    this.procesoLogin = false;
    this.credencialesNoValidas = false;
  }

  ngOnInit(): void {
  }

  public login() {
    this.credencialesNoValidas = false;
    this.procesoLogin = true;
    this._authService.autorizar(this.usuario_correo, this.usuario_clave).subscribe({
      next: (resp) => {
        console.log("Dentro del subscribe", resp);
        this.procesoLogin = false;
        if (resp.length > 0){
          this._router.navigate(['/usuarios']);
        } else {
          this.credencialesNoValidas = true;
          this._router.navigate(['/auth/login']);
        }

      },
      error: (error: HttpErrorResponse) => {
        console.error("Error", error);
      }
    });



    //comprobar el usuario, si existe voy a un sitio, y si no voy a otro


  }

}
