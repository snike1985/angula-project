import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output
}                             from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { PermissionControl }  from '../../config/permission-control.config';
import { Subscription }       from 'rxjs/Subscription';
import { UserRoleFunctions }  from '../../interfaces/user-role';


@Component( {
  selector: 'permission-control',
  templateUrl: './permission-control.component.html',
  styleUrls: [ './permission-control.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef( () => PermissionControlComponent ),
      multi: true
    }
  ]
} )
export class PermissionControlComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input( 'value' ) private _value;
  @Input() public functionData;

  @Input() public language;

  @Output() public deleteFunction = new EventEmitter;
  public permissionFormGroup: FormGroup = null;

  private subscriptionPermissionFormGroup: Subscription;

  public texts: Object = PermissionControl;
  public permissions: string[] = [ 'create', 'read', 'update', 'delete' ];
  public canChange: boolean = true;

  constructor() {
  }


  get value(): any {
    return this._value;
  }

  set value( val ) {
    this._value = val;
    this._onChange( val );
  }


  private _onChange = ( _: any ) => {
  };

  private _onTouched = () => {
  };

  private dataAdaptation( data: Object ) {

    if ( this.canChange ) {

      this.canChange = false;

      if ( this.value[ 'canView' ] !== data[ 'read' ] ) {

        this.makeReadChanges( data );

      } else if ( this.value[ 'canCreate' ] !== data[ 'create' ] ) {

        this.makeCreateChanges( data );


      } else if ( this.value[ 'canModify' ] !== data[ 'update' ] ) {

        this.makeUpdateChanges( data );

      } else if ( this.value[ 'canDelete' ] !== data[ 'delete' ] ) {

        this.makeDeleteChanges( data );

      }

    }

  }

  private createFormGroup( data: Object ): void {

    this.permissionFormGroup = new FormGroup( {
      create: new FormControl( data[ 'canCreate' ] ),
      read: new FormControl( data[ 'canView' ] ),
      update: new FormControl( data[ 'canModify' ] ),
      delete: new FormControl( data[ 'canDelete' ] )
    } );

  }

  private formatedFunction( data: Object ): UserRoleFunctions {

    return {
      id: data[ 'id' ],
      function: data[ 'function' ],
      canCreate: data[ 'canCreate' ],
      canView: data[ 'canView' ],
      canModify: data[ 'canModify' ],
      canDelete: data[ 'canDelete' ]
    };

  }

  private makeCreateChanges( data: Object ): void {

    if ( data[ 'create' ] ) {

      this.permissionFormGroup.setValue( {
        read: true,
        create: true,
        update: true,
        delete: data[ 'delete' ]
      } );

    } else {

      this.permissionFormGroup.setValue( {
        read: data[ 'read' ],
        create: false,
        update: false,
        delete: data[ 'delete' ]
      } );

    }

    this.canChange = true;

  }

  private makeDeleteChanges( data: Object ): void {

    if ( data[ 'delete' ] ) {

      this.permissionFormGroup.setValue( {
        read: true,
        create: data[ 'create' ],
        update: data[ 'update' ],
        delete: true
      } );

    } else {

      this.permissionFormGroup.setValue( {
        read: data[ 'read' ],
        create: data[ 'create' ],
        update: data[ 'update' ],
        delete: false
      } );

    }

    this.canChange = true;

  }

  private makeReadChanges( data: Object ): void {

    if ( !data[ 'read' ] ) {

      this.permissionFormGroup.setValue( {
        read: false,
        create: false,
        update: false,
        delete: false
      } );

    }

    this.canChange = true;

  }

  private makeUpdateChanges( data: Object ): void {

    if ( data[ 'update' ] ) {

      this.permissionFormGroup.setValue( {
        read: true,
        create: data[ 'create' ],
        update: true,
        delete: data[ 'delete' ]
      } );

    } else {

      this.permissionFormGroup.setValue( {
        read: data[ 'read' ],
        create: data[ 'create' ],
        update: false,
        delete: data[ 'delete' ]
      } );

    }

    this.canChange = true;

  }

  private subscribeOnPermissionFormGroup(): void {

    this.subscriptionPermissionFormGroup = this.permissionFormGroup.valueChanges.subscribe(
      ( data ) => {

        this.dataAdaptation( data );

        if ( this.canChange ) {

          let formValue = this.permissionFormGroup.value;

          this.value = {
            id: this.value[ 'id' ],
            function: this.value[ 'function' ],
            canView: formValue[ 'read' ],
            canCreate: formValue[ 'create' ],
            canModify: formValue[ 'update' ],
            canDelete: formValue[ 'delete' ]
          };

        }

      }
    );

  }

  private unSubscribeFromPermissionFormGroup(): void {

    this.subscriptionPermissionFormGroup.unsubscribe();

  }


  public deleteItem(): void {

    this.deleteFunction.emit( this.functionData[ 'value' ] );

  }

  public ngOnDestroy(): void {

    this.unSubscribeFromPermissionFormGroup();

  }

  public ngOnInit() {
  }

  public registerOnChange( fn: ( _: any ) => void ): void {
    this._onChange = fn;
  }

  public registerOnTouched( fn: () => void ): void {
    this._onTouched = fn;
  }

  public writeValue( val: UserRoleFunctions ) {

    if ( this.permissionFormGroup === null ) {

      this.createFormGroup( val );

      this.subscribeOnPermissionFormGroup();

    }

    if ( this.value !== val && val !== undefined ) {

      this.value = this.formatedFunction( val );

    }

  }

}
