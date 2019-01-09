import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable()
export class DbProvider {
  private db = {
    "userInfo": {
      "accountType": "",
      "email": "",
      "fullName": "",
      "phoneNumber": "",
      "uid": "",
      "profilePhotoUrl":""
    },
    "photo": {
      "photoUrl": "",
    }
  };
  constructor() {
    console.log('Hello DbProvider Provider');
  }


  get(name) {
    if (sessionStorage.db) {
      this.db = JSON.parse(sessionStorage.db);
    }
    var targetName = name.split('.');
    if (targetName.length > 1) {
      if (this.db[targetName[0]][targetName[1]]) {
        return this.db[targetName[0]][targetName[1]];
      } else {
        console.log("property does not exist");
        return false;

      }
    } else {
      if (this.db[targetName[0]]) {
        return this.db[targetName[0]];
      } else {
        console.log("object does not exist");
        return false;

      }
    }
  }

  // set(name, value) {
  //   if (sessionStorage.db) {
  //     this.db = JSON.parse(sessionStorage.db);
  //   }
  //   var targetName = name.split('.');
  //   if (targetName.length > 1) {
  //     // if (this.db[targetName[0]][targetName[1]]) {     
  //       this.db[targetName[0]][targetName[1]] = value;
  //     // } else {
  //     //   console.log("property does not exist");
  //     //   console.log(this.db[targetName[0]][targetName[1]]);
  //     //   return false;
  //     // }
  //   } else {
  //     // if (this.db[targetName[0]]) {
  //       this.db[targetName[0]] = value;
  //     // } else {
  //     //   console.log("object does not exist");
  //     //   console.log(targetName[0]);
  //     //   return false;

  //     // }
  //   }
  //   sessionStorage.db = JSON.stringify(this.db)
  //   return true;

  // }

  set(name, value) {
    if (sessionStorage.db) {
      this.db = JSON.parse(sessionStorage.db);
    }
    var targetName = name.split('.');
    if (targetName.length > 1) {
      this.db[targetName[0]][targetName[1]] = value;
    } else {
      this.db[targetName[0]] = value;
    }
    sessionStorage.db = JSON.stringify(this.db)
    return true;
  }

}

// https://github.com/zinoadidis
