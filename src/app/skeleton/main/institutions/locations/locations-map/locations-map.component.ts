import {Component, Input} from '@angular/core';

@Component({
    selector: 'locations-map',
    templateUrl: './locations-map.component.html',
    styleUrls: ['./locations-map.component.scss']
})
export class LocationsMapComponent {

    @Input() public tableData: Object[];

    constructor() {}
}
