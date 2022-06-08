import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageUsuariosComponent} from "./usuarios/page-usuarios/page-usuarios.component";
import {PageIncidenciasComponent} from "./incidencias/page-incidencias/page-incidencias.component";
import {PageCentralesComponent} from "./centrales/page-centrales/page-centrales.component";

const routes: Routes = [
  {path: "", component: PageUsuariosComponent, pathMatch: "full" },
  {path: "usuarios", component: PageUsuariosComponent},
  {path: "incidencias", component: PageIncidenciasComponent},
  {path: "centrales", component: PageCentralesComponent },
  {path: "**", redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
