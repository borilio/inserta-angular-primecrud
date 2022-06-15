import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  public login() {
    //comprobar el usuario, si existe voy a un sitio, y si no voy a otro
    this._router.navigate(['/usuarios']);

  }

}
