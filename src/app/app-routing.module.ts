import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageUsuariosComponent} from "./usuarios/page-usuarios/page-usuarios.component";
import {PageIncidenciasComponent} from "./incidencias/page-incidencias/page-incidencias.component";
import {PageCentralesComponent} from "./centrales/page-centrales/page-centrales.component";
import {AuthGuard} from "./auth/guards/auth.guard";

const routes: Routes = [

  {path: "", redirectTo: "auth/login", pathMatch: "full"},

  {
    path: "auth",
    loadChildren: ()=> import('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: "usuarios",
    loadChildren: ()=> import('./usuarios/usuarios.module').then( m => m.UsuariosModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },

  {path: "incidencias", component: PageIncidenciasComponent},
  {path: "centrales", component: PageCentralesComponent },

  {path: "**", redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
