import { Component }              from '@angular/core';
import { Notification }           from '../../interfaces/notification';
import { Subscription }           from 'rxjs/Rx';

import { NotificationService }    from '../../services/notification.service';

import { FlyInOut }               from '../../config/animations.config';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: [ './notification.component.scss' ],
  animations: [ FlyInOut ]
})

export class NotificationComponent {

  public _notes: Notification[];
  private notificationSubscription: Subscription;

  public showTime: number = 3000;

  constructor( private _notifications: NotificationService ) {

    this._notes = new Array<Notification>();

    this.notificationSubscription = _notifications.noteAdded.subscribe(note => {

      this._notes.unshift(note);

      setTimeout( () => { this.hide.bind( this )( note ); }, this.showTime );
    });
  }

  private hide( note ) {

    let index = this._notes.indexOf(note);

    if (index >= 0) {
      this._notes.splice(index, 1);
    }
    return false;
  }
}
