import {
  Component,
  Input,
  OnInit
}                             from '@angular/core';

import { FunctionsConfig }    from '../../../../config/user-roles.config';
import {
  FlyInOut,
  SlideDown
}                             from '../../../../config/animations.config';

import { UserRoleFunctions }  from '../../../../interfaces/user-role';

@Component( {
  selector: 'functions',
  templateUrl: './functions.component.html',
  styleUrls: [ './functions.component.scss' ],
  animations: [ FlyInOut, SlideDown ]
} )
export class FunctionsComponent implements OnInit {

  private config: Object = FunctionsConfig;

  @Input() public functions: UserRoleFunctions[];
  @Input() public language: string;

  public title: string;
  public texts: Object;
  public hiddenList: boolean = false;


  constructor() {}


  public ngOnInit(): void {

    this.texts = this.config[ 'texts' ][ this.language ];
    this.getTitle();

  }

  public getTitle(): void {

    if ( this.functions.length === 1 ) {

      this.title = this.texts[ 'title' ];

    } else {

      this.title = `${ this.texts[ 'title' ] }s`;

    }

  }

  public toggleList(): void {

    this.hiddenList = !this.hiddenList;

  }

}
