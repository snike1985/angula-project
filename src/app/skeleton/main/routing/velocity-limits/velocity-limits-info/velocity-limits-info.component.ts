import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ContentCommonComponent }           from '../../../../content-common/content-common.component';
import { DataBindingService }               from '../../../../../services/data.binding.service';
import { FadeInOut, VisibilityChanged }     from '../../../../../config/animations.config';

@Component({
  selector: 'velocity-limits-info',
  templateUrl: './velocity-limits-info.component.html',
  styleUrls: ['./velocity-limits-info.component.scss'],
  animations: [ VisibilityChanged, FadeInOut ]
})
export class VelocityLimitsInfoComponent extends ContentCommonComponent {

  constructor(
      protected dataBindingService: DataBindingService,
      public  elemHref: ElementRef,
      public renderer: Renderer2
  ) {
    super(dataBindingService, elemHref, renderer);

    this.hideSpinner();
  }

}