import { Component, Input }                                   from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators }    from '@angular/forms';
import { Router }                                             from '@angular/router';
import { Subscription }                                       from 'rxjs/Subscription';

import { SpinnerComponent }                                   from '../../spinner/spinner.component';

import { AuthService }                                        from '../../../services/auth.service';

import { VisibilityChanged }                                  from '../../../config/animations.config';
import {DataBindingService} from "../../../services/data.binding.service";

@Component({
  selector: 'new-password',
  animations: [ VisibilityChanged ],
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent extends SpinnerComponent {

  private passTokenSubscribtion: Subscription;
  private passToken: string;

  @Input() resetPassVisible: Object;
  @Input() texts: Object;

  public passwordToken: boolean = true;
  public newPasswordForm: FormGroup;
  public failureFlag: boolean;
  public failureText: string = '';

  constructor( private authService: AuthService,
               private formBuilder: FormBuilder,
               private dataBindingService: DataBindingService,
               private router: Router) {

    super();

    this.subscribePassToken();

  }

  private createForm(): void {

    this.newPasswordForm = this.formBuilder.group( {
      newPassword: new FormControl ( '', Validators.required ),
      confirmPassword: new FormControl ( '', Validators.required ),
      resetPasswordToken: new FormControl( this.passToken )
    } );

  }

  private subscribePassToken(): void {

    this.passTokenSubscribtion = this.dataBindingService.passwordToken.subscribe( data => {
      this.passToken = data;

      this.createForm();

      this.hideSpinner();
    } );

  }

  private unsubscribePassToken(): void {

    this.passTokenSubscribtion.unsubscribe();

  }


  public setDefaultState(): void {

    this.failureFlag = false;
  }

  public submit( e, { value }: any ): void {

    let formData = { value }.value;

    if ( formData[ 'newPassword' ] === formData[ 'confirmPassword' ] ) {

      this.showSpinner();

      this.authService.send( 'newPassword', value )
          .subscribe(
              data => {

                let dataJson = data.json();

                if ( dataJson[ 'status' ] === 'failure' ) {

                  this.hideSpinner();

                  this.failureText = dataJson[ 'message' ];

                  this.failureFlag = true;

                } else {

                  this.resetPassVisible[ 'value' ] = 0;

                  this.router.navigate( [ 'auth' ] );

                }
              },
              (error: Object) => {

                switch ( error['status'] ) {
                  case 401:

                    break;
                }
              }
          );
    } else {

      this.failureText = '';

      this.failureFlag = true;

      e.preventDefault();

    }
  }

  public switchForms(): void {

    this.resetPassVisible[ 'value' ] = 0;

    this.showSpinner();

  }

}
