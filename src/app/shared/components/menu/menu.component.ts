import { Component, OnInit } from '@angular/core';
import {MenuItem, PrimeIcons} from "primeng/api";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public items: MenuItem[];

  constructor(
    private _router : Router,
    private _authService: AuthService
    ) {
    this.items = [
      {label: "Inicio", icon: PrimeIcons.HOME, routerLink: "" },
      {label: "Usuarios", icon: PrimeIcons.USERS, routerLink: "usuarios" },
      {label: "Centrales", icon: PrimeIcons.BUILDING, routerLink: "centrales" },
      {label: "Incidencias", icon: PrimeIcons.CALENDAR_TIMES, routerLink: "incidencias" },
      {separator: true},
      {
        label: "Cerrar sesión",
        icon: PrimeIcons.POWER_OFF,
        command: () => this.logout(),
      }
    ];
  }

  get usuarioActivo(){
    return this._authService.usuarioActivo;
  }

  ngOnInit(): void {
  }

  public logout() {
    this._authService.logout();
    this._router.navigate(['/auth/login']);
  }



}
