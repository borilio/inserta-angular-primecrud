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
import {TooltipModule} from "primeng/tooltip";
import {PasswordModule} from "primeng/password";
import {MessageModule} from "primeng/message";
import {MessagesModule} from "primeng/messages";
import {AvatarModule} from "primeng/avatar";
import {TieredMenuModule} from "primeng/tieredmenu";
import {SlideMenuModule} from "primeng/slidemenu";

@NgModule({
  //No necesitamos hacer imports, solo exports para poder usar estos módulos en otros componentes

  exports: [
    ButtonModule,
    CardModule,
    MenuModule,
    ProgressBarModule,
    ToastModule,
    TableModule,
    ConfirmPopupModule,
    RippleModule,
    DialogModule,
    ToolbarModule,
    InputTextModule,
    DropdownModule,
    TooltipModule,
    PasswordModule,
    MessageModule,
    MessagesModule,
    AvatarModule,
    TieredMenuModule,
    SlideMenuModule
  ]
})
export class PrimengModule { }
