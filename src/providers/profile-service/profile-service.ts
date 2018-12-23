import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
// import { UserMetadata } from '@firebase/auth-types'

@Injectable()
export class ProfileServiceProvider {
  public userProfile: firebase.database.Reference;
  public currentUser: firebase.User;
  public userInfo: firebase.database.Reference;
  // public currentUserMetadata: UserMetadata;
  storageRef: firebase.storage.Reference;
  public username: any;
  // public profilePicture: string = null; 

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.userProfile = firebase.database().ref(`/userProfile/${user.uid}`);
        this.userInfo = firebase.database().ref(`/userProfile/${user.uid}/info`);
        this.storageRef = firebase.storage().ref(`/userProfile/${user.uid}/profilePicture.png`);
        // this.currentUserMetadata = user.metadata
      } 
    });


  }

  // getMetadata(): UserMetadata {
  //   return this.currentUserMetadata;
  // }

  getUserProfile(): firebase.database.Reference {
    return this.userProfile;
  }
  getUserInfo(): firebase.database.Reference {
    return this.userInfo;
  }

  updatefirstName(firstName: Date): Promise<any> {
    return this.userProfile.update({ firstName });
  }
  updateLastName(lastName: Date): Promise<any> {
    return this.userProfile.update({ lastName });
  }

  updatePhoneNumber(phoneNumber: string) {
    return this.userProfile.update({ phoneNumber });
  }

  updateHomeAddress(homeAddress: string) {
    return this.userProfile.update({ homeAddress });
  }

  updateBirthday(birthday: String): Promise<any> {
    return this.userProfile.update({ birthday });
  }
  updateOccupation(occupation: string) {
    return this.userProfile.update({ occupation });
  }
  updateVisiting(visiting: string) {
    return this.userProfile.update({ visiting });
  }
  updateGender(gender: string) {
    return this.userProfile.update({ gender });
  }
  updateFellowship(fellowship: string) {
    return this.userProfile.update({ fellowship });
  }



  addInfo(info: {}): firebase.database.ThenableReference {
    return this.userInfo.push(info);
  }

  addPic(profilePicture: string = null): PromiseLike<any> {
    if (profilePicture != null) {
      return this.storageRef.putString(profilePicture, 'base64', { contentType: 'image/png' }).then(() => {
        return this.storageRef.getDownloadURL().then(downloadURL => {
          return this.userInfo.child(`/profilePicture`).set(downloadURL);
        });
      });
    }
  }

  updateEmail(newEmail: string, password: string): Promise<any> {
    const credential: firebase.auth.AuthCredential =
      firebase.auth.EmailAuthProvider.credential(
        this.currentUser.email,
        password
      );
    return this.currentUser
      .reauthenticateAndRetrieveDataWithCredential(credential)
      .then(() => {
        this.currentUser.updateEmail(newEmail).then(() => {
          this.userProfile.update({ email: newEmail });
        });
      })
      .catch(error => {
        console.error(error);
      });
  }


  updatePassword(newPassword: string, oldPassword: string): Promise<any> {
    const credential: firebase.auth.AuthCredential =
      firebase.auth.EmailAuthProvider.credential(
        this.currentUser.email,
        oldPassword
      );
    return this.currentUser
      .reauthenticateAndRetrieveDataWithCredential(credential)
      .then(() => {
        this.currentUser.updatePassword(newPassword).then(() => {
          38
          console.log('Password Changed');
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

}
