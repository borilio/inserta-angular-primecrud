import { NgModule } from '@angular/core';
import {MenuModule} from 'primeng/menu';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [],

  //No necesitamos hacer imports, solo exports para poder usar estos módulos en otros componentes

  exports: [
    MenuModule,
    CardModule,
    ButtonModule
  ]
})
export class PrimengModule { }
