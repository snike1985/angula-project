import { PreloaderComponent }       from '../preloader/preloader.component';

import { DataBindingService }       from '../../services/data.binding.service';

export class SpinnerComponent {

  public spinnerVisible: boolean = false;

  protected hideSpinner() {

    this.spinnerVisible = false;

  }

  protected showSpinner() {

    this.spinnerVisible = true;

  }
}


export class MainSpinnerComponent extends PreloaderComponent {

  public mainSpinnerVisible: boolean = false;

  constructor( protected dataBindingService: DataBindingService ) {

    super( dataBindingService );

  }

  protected hideSpinner() {

    setTimeout( () => {

      this.mainSpinnerVisible = false;

      this.dataBindingService.mainSpinnerVisible.next( this.mainSpinnerVisible );

    } );

  }

  protected showSpinner() {

    setTimeout( () => {

      this.mainSpinnerVisible = true;

      this.dataBindingService.mainSpinnerVisible.next( this.mainSpinnerVisible );

    } );

  }

}
