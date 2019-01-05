import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { NavParams } from 'ionic-angular/navigation/nav-params';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  // tab1Root = HomePage;
  tab2Root = ProfilePage; 
  // tab3Root = AboutPage;
  // tab4Root = ContactPage;
  
  uid:any;
  userData:any;

  constructor(public navParams: NavParams,) {
    this.uid = navParams.get('uid');
  
 
   
  }
}
 