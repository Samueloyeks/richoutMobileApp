import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  public contactForm: FormGroup;
  contact="faq";
  constructor(public navCtrl: NavController,public formBuilder:FormBuilder) {
    this.contactForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      phone: [''],
      message: [''],
    });
  }

}
 