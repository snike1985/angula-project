import { Component, ElementRef, Renderer2 } from '@angular/core';

import { ContentCommonComponent }           from '../../../content-common/content-common.component';

import { DataBindingService }               from '../../../../services/data.binding.service';

@Component({
  selector: 'velocity-limits',
  templateUrl: './velocity-limits.component.html'
})
export class VelocityLimitsComponent extends ContentCommonComponent{

  constructor(
      protected dataBindingService: DataBindingService,
      public  elemHref: ElementRef,
      public renderer: Renderer2
  ) {
    super(dataBindingService, elemHref, renderer);

    this.hideSpinner();
  }

}
