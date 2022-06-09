import { NgModule } from '@angular/core';
import {MenuModule} from 'primeng/menu';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {ProgressBarModule} from 'primeng/progressbar';
import {ToastModule} from 'primeng/toast';

@NgModule({
  declarations: [],

  //No necesitamos hacer imports, solo exports para poder usar estos módulos en otros componentes

  exports: [
    MenuModule,
    CardModule,
    ButtonModule,
    ProgressBarModule,
    ToastModule
  ]
})
export class PrimengModule { }
