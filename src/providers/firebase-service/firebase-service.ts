import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'rxjs/add/operator/map';


/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseServiceProvider {
  public data: any;
  public fireAuth: any;
  public userProfile: any;
  public userOccupation: any;


  constructor() {
    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('users');
  }

 loginUserService(email: string, password: string): Promise<void> {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  logoutUserService(): Promise<void> {
    const userId: string = firebase.auth().currentUser.uid;
    firebase.database().ref(`/userProfile/${userId}`).off();
    return firebase.auth().signOut();
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  } 



  signupUserService(account: {}): Promise<any> {

    return firebase.auth().createUserWithEmailAndPassword(account['email'], account['password']).then(newUserCredentials => {
      firebase.database().ref(`/userProfile/` + newUserCredentials.user.uid).set(account).then(() => {
        firebase.auth().currentUser.sendEmailVerification();
        //Email sent
      });
    })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }
 

}
