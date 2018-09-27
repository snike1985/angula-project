import { Component, Input }                                 from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators }  from '@angular/forms';

import { SpinnerComponent }                                 from '../../spinner/spinner.component';

import { AuthService }                                      from '../../../services/auth.service';

import { VisibilityChanged }                                from '../../../config/animations.config';

@Component({
    selector: 'password',
    templateUrl: './password.component.html',
    styleUrls: [ './password.component.scss' ],
    animations: [ VisibilityChanged ]
})
export class PasswordComponent extends SpinnerComponent {

    @Input() resetPassVisible: Object;
    @Input() texts: Object;

    public sentFlag: boolean;
    public rememberForm: FormGroup;
    public failureFlag: boolean = false;
    public failureText: string = '';

    constructor( private authService: AuthService,
                 private formBuilder: FormBuilder ) {
        super();

        this.createForm();

    }

    private createForm(): void {

        this.rememberForm = this.formBuilder.group({
            email: new FormControl ('', Validators.email)
        });
    }


    public setDefaultState(): void {

        this.failureFlag = false;
    }

    public submit( { value }: any ): void {

        this.showSpinner();

        this.authService.send( 'reset', value )
            .subscribe(
                data => {

                    let dataJson = data.json();

                    if ( dataJson[ 'status' ] === 'failure' ) {

                        this.hideSpinner();

                        this.failureText = dataJson[ 'message' ];

                        this.failureFlag = true;

                    } else {

                        this.sentFlag = true;

                        this.hideSpinner();
                    }
                },
                (error: Object) => {

                    switch ( error[ 'status' ] ) {
                        case 401:

                            break;
                    }
                }
            );

    }

    public switchForms(): void {

        this.resetPassVisible[ 'value' ] = !this.resetPassVisible[ 'value' ];

        this.showSpinner();

    }
}
