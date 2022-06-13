import { NgModule } from '@angular/core';
import {MenuModule} from 'primeng/menu';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {ProgressBarModule} from 'primeng/progressbar';
import {ToastModule} from 'primeng/toast';
import {TableModule} from "primeng/table";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {RippleModule} from "primeng/ripple";
import {DialogModule} from "primeng/dialog";
import {ToolbarModule} from "primeng/toolbar";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";

@NgModule({
  //No necesitamos hacer imports, solo exports para poder usar estos módulos en otros componentes

  exports: [
    MenuModule,
    CardModule,
    ButtonModule,
    ProgressBarModule,
    ToastModule,
    TableModule,
    ConfirmPopupModule,
    RippleModule,
    DialogModule,
    ToolbarModule,
    InputTextModule,
    DropdownModule
  ]
})
export class PrimengModule { }
