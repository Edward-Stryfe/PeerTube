import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { ModalModule } from 'ng2-bootstrap/modal';

import { AuthService } from './auth';
import { ConfirmComponent, ConfirmService } from './confirm';
import { MenuComponent, MenuAdminComponent } from './menu';
import { throwIfAlreadyLoaded } from './module-import-guard';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule,

    ModalModule,
    SimpleNotificationsModule
  ],

  declarations: [
    ConfirmComponent,
    MenuComponent,
    MenuAdminComponent
  ],

  exports: [
    SimpleNotificationsModule,

    ConfirmComponent,
    MenuComponent,
    MenuAdminComponent
  ],

  providers: [
    AuthService,
    ConfirmService
  ]
})
export class CoreModule {
   constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
