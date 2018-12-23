import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthorizeReceiverPage } from './authorize-receiver';

@NgModule({
  declarations: [
    AuthorizeReceiverPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthorizeReceiverPage),
  ],
})
export class AuthorizeReceiverPageModule {}
