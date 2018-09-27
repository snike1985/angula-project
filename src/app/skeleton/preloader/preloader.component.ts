import { DataBindingService }           from '../../services/data.binding.service';


export class PreloaderComponent {

    public isVisiblePreloader: boolean = true;

    constructor( protected dataBindingService: DataBindingService ) {}

    protected hidePreloader() {

        this.isVisiblePreloader = false;

        this.dataBindingService.preloaderVisible.next( this.isVisiblePreloader );

    }

    protected showPreloader() {

        this.isVisiblePreloader = true;

        this.dataBindingService.preloaderVisible.next( this.isVisiblePreloader );

    }

}
