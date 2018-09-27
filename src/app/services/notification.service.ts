import { Injectable }           from '@angular/core';
import { Subject }              from 'rxjs/Subject';
import { Notification }         from '../interfaces/notification';

@Injectable()
export class NotificationService {

  constructor() { }

  private add( notification: Notification ) {

    this._notifications.next( notification );
  }
  private _notifications = new Subject<Notification>();

  public noteAdded = this._notifications.asObservable();
  public errorNotify( title: string, message?: string ) {

    let notification: Notification = new Notification( 'error', title, message );

    this.add(notification);
  }
  public infoNotify ( title: string, message?: string ) {

    let notification: Notification = new Notification( 'info', title, message );

    this.add(notification);
  }
  public successNotify( title: string, message?: string ) {

    let notification: Notification = new Notification( 'success', title, message );

    this.add(notification);
  }
  public warningNotify ( title: string, message?: string ) {

    let notification: Notification = new Notification( 'warning', title, message );

    this.add(notification);
  }

}
