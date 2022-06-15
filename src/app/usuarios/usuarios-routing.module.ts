import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PageUsuariosComponent} from "./page-usuarios/page-usuarios.component";

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: PageUsuariosComponent },
      { path: 'pedidos', component: PageUsuariosComponent},
      { path: 'estadisticas', component: PageUsuariosComponent},
      { path: '**', component: PageUsuariosComponent}
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class UsuariosRoutingModule { }
