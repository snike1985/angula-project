import { Component }                    from '@angular/core';
import { Subscription }                 from 'rxjs/Subscription';
import { Ng2FileDropAcceptedFile,
         Ng2FileDropRejectedFile }      from 'ng2-file-drop';

import { PopupInnerComponent }          from '../../../popup-inner/popup-inner.component';

import { DataBindingService }           from '../../../../services/data.binding.service';
import { OverlayService }               from '../../../../services/overlay.service';
import { NotificationService }          from '../../../../services/notification.service';
import { InstitutionsRequestsService }  from '../../../../services/main/institutions/institutions-requests.service';

import { InstitutionsImportConfig }     from '../../../../config/institutions.config';
import {
  ValidationError,
  ValidationSuccessInstitution
}                                       from '../../../../interfaces/validation';

@Component( {
  selector: 'institutions-import',
  templateUrl: './institutions-import.component.html',
  styleUrls: [ './institutions-import.component.scss' ]
} )
export class InstitutionsImportComponent extends PopupInnerComponent {

  private progressSubscription: Subscription;
  private file: File;

  protected config = InstitutionsImportConfig;

  public step: number = 1;
  public progress: number = 0;
  public fileName: string;
  public supportedFileTypes: string[] = [ 'text/csv' ];
  public error: ValidationError[];
  public success: ValidationSuccessInstitution[];
  public successCounter: Object = {
    institutions: 0,
    devices: 0,
    locations: 0,
    merchants: 0
  };
  public dragClass: boolean = false;
  public dragClassRejected: boolean = false;


  constructor( protected dataBindingService: DataBindingService,
               protected overlayService: OverlayService,
               private institutionsService: InstitutionsRequestsService,
               private notification: NotificationService ) {

    super( dataBindingService, overlayService );

  }


  private showError( data: Object ): void {

    this.step = 4;

    this.error = data[ 'data' ][ 'errorList' ];

  }

  private showSuccess( data: Object ): void {

    this.step = 3;

    this.success = data[ 'data' ];

    this.successCounter[ 'institutions' ] = this.success[ 'institutions' ].length;

    for ( let institution of this.success[ 'institutions' ] ) {

      this.successCounter[ 'merchants' ] = institution[ 'merchants' ].length;

      for ( let merchant of institution[ 'merchants' ] ) {

        this.successCounter[ 'locations' ] = merchant[ 'locations' ].length;

        for ( let location of  merchant[ 'locations' ] ) {

          this.successCounter[ 'devices' ] = location[ 'devices' ].length;

        }

      }

    }

  }

  private upload( file: File ): void {

    this.progressSubscription = this.institutionsService.progressSubject.subscribe( ( progress ) => {
      this.progress = progress;
    } );

    this.institutionsService.upload( [ file ] ).subscribe( ( data: Object ) => {

      if ( data[ 'status' ] === 'Success' ) {

        this.showSuccess( data );

      } else {

        this.showError( data );

      }
      this.progressSubscription.unsubscribe();

    } );

  }


  protected unSubscribeAll(): void {

    if ( this.progressSubscription && !this.progressSubscription.closed ) {

      this.progressSubscription.unsubscribe();

    }

    this.globalSettingsSubscription.unsubscribe();

  }


  public close(): void {

    this.overlayService.closePopup();

  }

  public dragFileAccepted( acceptedFile: Ng2FileDropAcceptedFile ): void {

    this.fileName = acceptedFile.file.name;

    this.file = acceptedFile.file;

    this.dragClassRejected = false;

  }

  public dragFileRejected(rejectedFile: Ng2FileDropRejectedFile) {

    this.dragClassRejected = true;
    setTimeout( () => {
      this.dragClassRejected = false;
    }, 900 );

  }

  public dragFileOverStart() {

    this.dragClass = true;

  }

  public dragFileOverEnd() {

    this.dragClass = false;

  }

  public import(): void {

    this.step = 5;

    this.institutionsService.send( 'importAll', { 'file-id': this.success[ 'file-id' ] } ).subscribe( res => {
            let data = res.json();

            if ( data[ 'status' ] === 'Success' ) {

                this.notification.successNotify( `${ this.successCounter[ 'institutions' ] } ${ this.texts[ 'validInstitutions' ] }, ${ this.successCounter[ 'merchants' ] } ${ this.texts[ 'validMerchants' ] }, ${ this.successCounter[ 'locations' ] } ${ this.texts[ 'validLocations' ] }, ${ this.successCounter[ 'devices' ] } ${ this.texts[ 'validDevices' ] } successfully imported` );

                this.close();
            }

        } );
  }

  public onFileChange( e ): void {

    this.file = e.target.files[ 0 ];

    this.fileName = this.file.name;

  }

  public validate(): void {

    this.step = 2;
    this.upload( this.file );

  }

}
