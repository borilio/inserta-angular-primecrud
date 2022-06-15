import { Component, OnInit } from '@angular/core';
import {MenuItem, PrimeIcons} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public items: MenuItem[];

  constructor(private _router : Router) {
    this.items = [
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

  ngOnInit(): void {
  }

  public logout() {
    this._router.navigate(['/auth/login']);
  }

}
