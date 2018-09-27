import { Injectable, NgZone }                   from '@angular/core';
import { GoogleMapsAPIWrapper, MapsAPILoader }  from '@agm/core';
import { Observable }                           from 'rxjs/Observable';

declare const google;

@Injectable()
export class GMapsService {
    constructor(private __loader: MapsAPILoader) {

    }

    getGeocoding(address: string) {
        return Observable.create(observer => {
            try {
                this.__loader.load().then(() => {
                    let geocoder = new google.maps.Geocoder();
                    geocoder.geocode({ address }, (results, status) => {

                        if (status === google.maps.GeocoderStatus.OK) {
                            const place = results[0].geometry.location;
                            observer.next(place);
                        } else {
                            observer.next(null);
                            console.error('Error - ', results, ' & Status - ', status);
                            if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
                                observer.error('Address not found!');
                            } else {
                                observer.error(status);
                            }

                        }
                        observer.complete();
                    });
                });
            } catch (error) {
                observer.error('error getGeocoding' + error);
                observer.complete();
            }

        });
    }
}