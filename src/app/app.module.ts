import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SharedModule} from "./shared/shared.module";
import {UsuariosModule} from "./usuarios/usuarios.module";
import {IncidenciasModule} from "./incidencias/incidencias.module";
import {CentralesModule} from "./centrales/centrales.module";
import {PrimengModule} from "./primeng/primeng.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    UsuariosModule,
    IncidenciasModule,
    CentralesModule,
    PrimengModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
