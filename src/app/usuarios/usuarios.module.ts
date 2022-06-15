import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageUsuariosComponent } from './page-usuarios/page-usuarios.component';
import {PrimengModule} from "../primeng/primeng.module";
import {ReactiveFormsModule} from "@angular/forms";
import {UsuariosRoutingModule} from "./usuarios-routing.module";


@NgModule({
  declarations: [
    PageUsuariosComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    PrimengModule,
    ReactiveFormsModule

  ]
})
export class UsuariosModule { }
