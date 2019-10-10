/**
 * Define Firebase connection
 *
 * @author Rishabh Pandey <geekrishabh@gmail.com>
 */

import firebase from 'firebase';
import admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

/** Class representing a firebase authentication */
class FirebaseAuth {
  public firebaseConfig: object;
  public serviceKey: object;
  constructor() {
    this.firebaseConfig = path.join(__dirname, '../config/config.json');
    this.serviceKey = path.join(__dirname, '../config/service-key.json');
  }
  /**
   * Creates a firebaseAuth
   * @params {Object} firebaseConfig - The config for firebase
   * @params {Object} serviceKey - The service account for firebase
   */
  // Initialize your database pool
  public static init(): void {
    this.firebase = firebase;
    this.admin = admin;
    this.firebase.initializeApp(this.firebaseConfig);

    // if (nameOfAdmin) {
    //   this.admin.initializeApp(
    //     { credential: this.admin.credential.cert(serviceKey) },
    //     nameOfAdmin
    //   );
    // } else {
    //   this.admin.initializeApp({
    //     credential: this.admin.credential.cert(serviceKey)
    //   });
    // }
  }

  /**
   * Signing in an user and tries to get their id token.
   *
   * @param  {String} email - Email for the account
   * @param  {String} password - Password for the account
   * @promise {Object} Returns an object with idToken and uid of the user
   * @rejects {Object} Returns an object with errors if rejected
   */
  // signIn(email, password) {
  //   return this.firebase
  //     .auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .then(user => {
  //       return this.firebase
  //         .auth()
  //         .currentUser.getIdToken(true)
  //         .then(idToken => {
  //           return { idToken: idToken, uid: user.uid };
  //         })
  //         .catch(error => {
  //           throw { code: error.code, message: error.message };
  //         });
  //     })
  //     .catch(error => {
  //       throw { code: error.code, message: error.message };
  //     });
  // }

  /**
   * Verify the id token of an user.
   *
   * @promise {Boolean} Returns true if successful
   * @rejects {Object} Returns an object with errors if rejected
   */
  // authToken(idToken) {
  //   return this.admin.auth().verifyIdToken(idToken);
  // }
}

module.exports = FirebaseAuth;
