import { Component, OnInit, Input }        from '@angular/core';
import { Router }                          from '@angular/router';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators }                           from '@angular/forms';

import { SpinnerComponent }                from '../../spinner/spinner.component';
import { DataBindingService }              from '../../../services/data.binding.service';

import { AuthService }                     from '../../../services/auth.service';

import { VisibilityChanged }               from '../../../config/animations.config';

@Component({
    selector: 'login',
    animations: [ VisibilityChanged ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent extends SpinnerComponent implements OnInit {

    @Input() resetPassVisible: Object;
    @Input() texts: Object;

    public sentFlag: boolean = false;
    public registerForm: FormGroup;
    public failureFlag: boolean = false;
    public failureText: string = '';

    constructor (
        private formBuilder: FormBuilder,
        private authService: AuthService,
        protected dataBindingService: DataBindingService,
        protected router: Router
    ) {
        super();
    }

    private createForm(): void {

        this.registerForm = this.formBuilder.group({
            userName: new FormControl( 'user@dev.com', [ Validators.required, Validators.email ] ),
            password: new FormControl( '1234', Validators.required )
        });

    }

    private getToken(): void {

        let curToken = window.localStorage.getItem( 'auth_token' );

        if ( curToken ) {

            this.router.navigate( [ '' ] );

        }
    }


    public ngOnInit(): void {

        this.getToken();
        this.createForm();

    }

    public setDefaultState(): void {

        this.failureFlag = false;
    }

    public submit( { value }: any ): void {

        this.showSpinner();

        this.authService.send( 'auth', value )
            .subscribe(
                data => {

                    let dataJson = data.json(),
                        token = data.headers.get( 'x-auth-token' );

                    if ( dataJson[ 'status' ] === 'failure' ) {

                        this.hideSpinner();
                        this.failureText = dataJson[ 'message' ];
                        this.failureFlag = true;

                    } else {

                        window.localStorage.setItem( 'auth_token', token );

                        this.dataBindingService.token.next( token );

                        this.dataBindingService.me.next( dataJson[ 'data' ] );

                        this.router.navigate( [ '/' ] );

                    }
                },
                ( error: Object ) => {

                    switch ( error[ 'status' ] ) {
                        case 401:

                            break;
                    }
                }
            );

    }

    public switchForms( e ): void {
        e.preventDefault();
        this.resetPassVisible[ 'value' ] = !this.resetPassVisible[ 'value' ];
    }

}
