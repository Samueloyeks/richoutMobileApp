import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProfilePage } from '../pages/profile/profile';
import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';
import { ProfileServiceProvider } from '../providers/profile-service/profile-service';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { LandingPage } from '../pages/landing/landing';
import { AuthorizeDonorPage } from '../pages/authorize-donor/authorize-donor';
import { AuthorizeReceiverPage } from '../pages/authorize-receiver/authorize-receiver';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ProfilePage,
    ResetPasswordPage,
    LandingPage,
    AuthorizeDonorPage,
    AuthorizeReceiverPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      scrollAssist:false,
      autoFocusAssist:false
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ProfilePage,
    ResetPasswordPage,
    LandingPage,
    AuthorizeDonorPage,
    AuthorizeReceiverPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseServiceProvider,
    ProfileServiceProvider
  ]
})
export class AppModule {}
