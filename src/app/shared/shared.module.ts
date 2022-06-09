import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import {AppRoutingModule} from "../app-routing.module";
import {PrimengModule} from "../primeng/primeng.module";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    PrimengModule,
    HttpClientModule
  ],
  exports: [
    MenuComponent
  ]
})
export class SharedModule { }
