import {Component, ElementRef, Renderer2}                        from '@angular/core';
import { Router }                           from '@angular/router';
import { FormBuilder,
    FormControl,
    FormGroup,
    Validators }                            from '@angular/forms';

import { ContentCommonComponent }           from '../../../content-common/content-common.component';

import { DataBindingService }               from '../../../../services/data.binding.service';
import { NotificationService }              from '../../../../services/notification.service';
import { ProfileService }                   from '../../../../services/main/profile/profile.service';

import { FadeInOut, VisibilityChanged }     from '../../../../config/animations.config';
import { ProfileChangeConfig }              from '../../../../config/profile-change.config';

@Component({
    selector: 'password-profile',
    templateUrl: './password-profile.component.html',
    styleUrls: [ './password-profile.component.scss' ],
    animations: [ VisibilityChanged, FadeInOut ]
})
export class PasswordProfileComponent extends ContentCommonComponent {

    private profileConfig = ProfileChangeConfig;

    public texts: Object;

    public editPasswordForm: FormGroup ;
    public failureFlag: boolean;
    public failureText: string = '';
    public loading: boolean = false;

    constructor(
        protected dataBindingService: DataBindingService,
        private formBuilder: FormBuilder,
        private changeService: ProfileService,
        private router: Router,
        private notification: NotificationService,
        public  elemHref: ElementRef,
        public renderer: Renderer2) {

        super(dataBindingService, elemHref, renderer);
        this.setText();

        this.createForm();

    }

    private createForm(): void {

        this.editPasswordForm = this.formBuilder.group({
            currentPassword: new FormControl( '', Validators.required ),
            newPassword: new FormControl( '', Validators.required ),
            verifyPassword: new FormControl( '', Validators.required )
        });
    }


    protected setText(): void {

        this.texts = this.profileConfig[ 'texts' ][ this.language ];

        setTimeout( () => {
            this.hideSpinner();
        });

    }


    public setDefaultState(): void {

        this.failureFlag = false;
    }

    public submit( e, {value}: any ): void {

        let formData = { value }.value;

        this.loading = true;

        if ( formData[ 'newPassword' ] === formData[ 'verifyPassword' ] ) { this.changeService.send( 'changePassword', formData )
            .subscribe(
                data => {

                    let dataJson = data.json();

                    this.loading = false;

                    if ( dataJson[ 'status' ] === 'failure' ) {

                        this.failureText = dataJson[ 'message' ];

                        this.failureFlag = true;

                    } else {

                        this.router.navigate( [ '/profile' ] );

                        this.notification.successNotify( 'Password successfully changed' );

                    }

                },
                (error: Object) => {

                    switch (error['status']) {
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

}
