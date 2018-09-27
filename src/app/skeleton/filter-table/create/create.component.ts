import {
  AfterViewInit,
  ElementRef,
  Renderer2}                    from '@angular/core';
import { Subscription }         from 'rxjs/Subscription';

import { FilterTableComponent } from '../filter-table.component';
import { NotificationService }  from '../../../services/notification.service';
import { DataBindingService }   from '../../../services/data.binding.service';

export class CreateComponent {

}
// export class CreateComponent extends FilterTableComponent implements AfterViewInit {
//
//   private tablePresenceSubscription: Subscription;
//   private updateAfterCreate: boolean = false;
//
//   public editVisibility: boolean = false;
//   public isEdit: boolean = false;
//   public currentItem: Object;
//
//   constructor( protected itemsService: any,
//                protected notificationService: NotificationService,
//                protected dataBindingService: DataBindingService,
//                public elemHref: ElementRef,
//                public renderer: Renderer2 ) {
//
//     super( itemsService, notificationService, dataBindingService, elemHref, renderer );
//
//   }
//
//
//   protected unsubscribeAll(): void {
//
//     this.globalSettingsSubscription.unsubscribe();
//     this.viewSubscription.unsubscribe();
//     this.scrollSubscription.unsubscribe();
//     this.tablePresenceSubscription.unsubscribe();
//
//   }
//
//
//   public ngAfterViewInit(): void {
//
//     this.subscribeScrollList();
//
//     let self = this;
//
//     this.tablePresenceSubscription = this.table.changes.subscribe( (data) => {
//
//       if ( data.length && this.updateAfterCreate ) {
//
//         setTimeout( () => {
//           self.table.first.updateData( self.tableData );
//         } );
//
//         this.updateAfterCreate = false;
//
//       }
//
//     });
//
//     setTimeout( () => {
//       self.getFilterData();
//     } );
//
//   }
//
//   public back(): void {
//
//     this.updateAfterCreate = true;
//     this.editVisibility = false;
//
//   }
//
//   public create(): void {
//
//     this.isEdit = false;
//     this.editVisibility = true;
//
//   }
//
//   public deleteItem( id ): void {
//
//     this.tableData = this.tableData.filter( data => {
//
//       return data[ 'id' ] !== id;
//
//     } );
//
//   }
//
//   public edit( item: Object ): void {
//
//     this.isEdit = true;
//     this.currentItem = item;
//     this.editVisibility = true;
//
//   }
//
//
//
//
// }
