import { Component, ElementRef, Renderer2 } from '@angular/core';

import { ContentCommonComponent }           from '../../../content-common/content-common.component';

import { DataBindingService }               from '../../../../services/data.binding.service';

import { FadeInOut, VisibilityChanged }     from '../../../../config/animations.config';

@Component({
  selector: 'router',
  templateUrl: './router.component.html',
  styleUrls: [ './router.component.scss' ],
  animations: [ VisibilityChanged, FadeInOut ]
})
export class RouterComponent extends ContentCommonComponent  {

  constructor(
      protected dataBindingService: DataBindingService,
      public  elemHref: ElementRef,
      public renderer: Renderer2
  ) {
    super(dataBindingService, elemHref, renderer);

    this.hideSpinner();
  }

}
