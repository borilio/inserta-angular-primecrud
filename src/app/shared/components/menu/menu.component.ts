import { Component, OnInit } from '@angular/core';
import {MenuItem, PrimeIcons} from "primeng/api";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public items: MenuItem[];

  constructor() {
    this.items = [
      {label: "Usuarios", icon: PrimeIcons.USERS, routerLink: "usuarios" },
      {label: "Centrales", icon: PrimeIcons.BUILDING, routerLink: "centrales" },
      {label: "Incidencias", icon: PrimeIcons.CALENDAR_TIMES, routerLink: "incidencias" },
      { separator: true},
      {label: "Cerrar sesión", icon: PrimeIcons.POWER_OFF}
    ];
  }

  ngOnInit(): void {
  }

}
