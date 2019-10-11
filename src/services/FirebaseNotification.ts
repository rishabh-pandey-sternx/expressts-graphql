/**
 * Firebase Notification
 *
 * @author Rishabh Pandey <geekrishabh@gmail.com>
 */

import { Request } from 'express';
const FCM = require('fcm-node');

import Locals from '../providers/Locals';

class Firebase {
  /**
   * Bind fcm-node with server key
   */
  serverKey: string = Locals.config().serverKey;
  fcm = new FCM(this.serverKey);

  public static sendNotification(data): void {
    const message = {
      //this may vary according to the message type (single recipient, multicast, topic, et cetera)
      to: data.to,
      notification: {
        title: data.title,
        body: data.body
      }
    };

    this.fcm.send(this.message, (err, response) => {
      if (err) {
        console.log('Something has gone wrong!', err);
      } else {
        console.log('Successfully sent with response: ', response);
      }
    });
  }
}

export default Firebase;
