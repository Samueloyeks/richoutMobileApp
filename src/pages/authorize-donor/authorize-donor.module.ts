import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthorizeDonorPage } from './authorize-donor';

@NgModule({
  declarations: [
    AuthorizeDonorPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthorizeDonorPage),
  ],
})
export class AuthorizeDonorPageModule {}
