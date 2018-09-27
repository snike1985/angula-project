import {Directive, Input, OnChanges, OnInit} from '@angular/core';
import {GoogleMapsAPIWrapper}     from '@agm/core';
import {Observable}               from 'rxjs/Observable';

import 'js-marker-clusterer/src/markerclusterer.js';
import {log} from 'util';

declare const google;
declare const MarkerClusterer;

@Directive({
    selector: 'marker-cluster'
})
export class MarkerClusterDirective implements OnInit, OnChanges {
    @Input() public tableData: Object[];
    public markerCluster: any;
    public markerClusterInfoWindows: any[] = [];
    public markers: any[] = [];

    constructor(private gmapsApi: GoogleMapsAPIWrapper) {
    }

    public ngOnInit() {

    }

    private loadMap(): void {
        const self = this;
        this.gmapsApi.getNativeMap().then((map) => {

            const markerIcon = {
                url: '/assets/img/location-marker.svg',
                scaledSize: new google.maps.Size(46, 52)
            };

            const style = {
                url: '/assets/cluster.png',
                height: 40,
                width: 40,
                textColor: '#FFF',
                textSize: 11,
                backgroundPosition: 'center center'
            };

            const clusterStyles = [
                {
                    url: 'assets/img/location-cluster-small.svg',
                    height: 60,
                    width: 60,
                    textColor: '#FFF',
                    textSize: 18,
                    backgroundPosition: 'center center'
                },
                {
                    url: 'assets/img/location-cluster-medium.svg',
                    height: 80,
                    width: 80,
                    textColor: '#FFF',
                    textSize: 24,
                    backgroundPosition: 'center center'
                },
                {
                    url: 'assets/img/location-cluster-large.svg',
                    height: 90,
                    width: 90,
                    textColor: '#FFF',
                    textSize: 24,
                    backgroundPosition: 'center center'
                }
            ];

            const clusterOptions = {
                imagePath: '/assets/cluster',
                gridSize: 70,
                styles: clusterStyles
            };

            let markersBounds = new google.maps.LatLngBounds();

            let infowindow = new google.maps.InfoWindow({
                maxWidth: 350
            });

            let closeInfoWindow = function () {
              infowindow.close();
                for (let i = 0; i < self.markerClusterInfoWindows.length; i++) {
                    self.markerClusterInfoWindows[i].close();
                }
                for (let i = 0; i < self.markers.length; i++) {
                    self.markers[i].setVisible(true);
                }
            };

            let addClassesInfoWindow = function () {
                const st = document.getElementsByClassName('gm-style-iw')[0],
                    countElems = document.getElementsByClassName('info-window').length;

                if (countElems > 1) {
                    st.parentElement.className = 'info-window-parent slider';
                } else {
                    st.parentElement.className = 'info-window-parent';
                }
                st.parentElement.lastElementChild.className = 'info-window-close';
            };

            let createInfoWindowContent = function (data): string {
                const locationAddress = data['locationDetail']['address1'] + ' ' +
                    '' + data['locationDetail']['address2'] + ', ' +
                    '' + data['locationDetail']['city'] + ', ' +
                    '' + data['locationDetail']['countryState']['stateName'] + ', ' +
                    '' + data['locationDetail']['country']['countryName'];

                const contentString = '' +
                    '<div class="info-window" id="info-window_' + data['id'] + '">' +
                    '<div class="info-window__head">' +
                    '<div class="info-window__name">' +
                    '<svg width="24px" height="24px" viewBox="0 0 24 24" style="fill:#cbcfda"><path d="M10.6330937,22.5618823 C10.6330937,22.5618823 3,15.0241537 3,10 C3,5.04489413 7.02943725,1 12,1 C16.9705627,1 21,5.04489413 21,10 C21,15.0241537 13.3767032,22.5512167 13.3767032,22.5512167 C12.6186064,23.3624145 11.3880152,23.3561328 10.6330937,22.5618823 Z M12,12 C13.6568542,12 15,10.6568542 15,9 C15,7.34314575 13.6568542,6 12,6 C10.3431458,6 9,7.34314575 9,9 C9,10.6568542 10.3431458,12 12,12 Z" id="Combined-Shape"></path> </svg>' +
                    '' + data['name'] +
                    '</div>' +
                    '' + locationAddress +
                    '</div>' +
                    '<ul class="info-window__content">' +
                    '<li>Status:' + data['status'] + '</li>' +
                    '<li>Code: <span>' + data['code'] + '</span></li>' +
                    '<li>Merchant:<a href="#">' + data['merchant']['name'] + '</a></li>' +
                    '<li><a href="#">' + data['totalDevice'] + ' Devices</a></li>' +
                    '</ul>' +
                    '<div class="info-window__footer">' +
                    '<button class="info-window__button" data-event="detail" data-id="' + data['id'] + '">View Details</button>' +
                    '<button class="info-window__button" data-event="edit" data-id="' + data['id'] + '">Edit</button>' +
                    '<button class="info-window__button" data-event="status" data-id="' + data['id'] + '">Disable</button>' +
                    '<button class="info-window__button" data-event="delete" data-id="' + data['id'] + '">Delete</button>' +
                    '</div>' +
                    '</div>';

                return contentString;
            };

            let setEventOnButton = function () {
                const infoWindowButtons = document.getElementsByClassName('info-window__button');

                for ( let i = 0; i < infoWindowButtons.length; i++ ) {
                    infoWindowButtons[i].addEventListener('click', () => {
                        console.log(infoWindowButtons[i].getAttribute('data-event'), infoWindowButtons[i].getAttribute('data-id'));
                    });
                }
            }

            Observable
                .interval(500)
                .skipWhile((s) => self.tableData == null || self.tableData.length <= 0)
                .take(1)
                .subscribe(() => {
                    if (self.markerCluster) {
                        self.markerCluster.clearMarkers();
                    }
                    for (let i = 0; i < self.markers.length; i++) {
                        self.markers[i].setMap(null);
                    }

                    self.markers = [];

                    if (self.tableData.length > 0) {
                        for (let i = 0; i < self.tableData.length; i++) {

                            if (self.tableData[i]['coordinates']['lat'] != null) {
                                const markerPosition = new google.maps.LatLng(self.tableData[i]['coordinates']['lat'], self.tableData[i]['coordinates']['lng']);

                                const marker = new google.maps.Marker({
                                    position: markerPosition,
                                    data: self.tableData[i],
                                    icon: markerIcon
                                });

                                markersBounds.extend(markerPosition);

                                self.markers.push(marker);

                                marker.addListener('click', function () {

                                    closeInfoWindow();

                                    const contentString = createInfoWindowContent(self.tableData[i]);

                                    infowindow.setContent(contentString);
                                    infowindow.open(map, marker);

                                    addClassesInfoWindow();

                                    marker.setVisible(false);

                                    setEventOnButton();

                                });

                                google.maps.event.addListener(infowindow, 'closeclick', function () {
                                    marker.setVisible(true);
                                });
                            }
                        }
                    }

                    map.fitBounds(markersBounds);

                    self.markerCluster = new MarkerClusterer(map, self.markers, clusterOptions);

                    self.markerCluster.addListener('clusterclick', function (cluster) {

                        closeInfoWindow();

                        const thisCluster = this;
                        let clusterMarkersContent = '';
                        let markers = cluster.getMarkers();

                        let infoWindow = new google.maps.InfoWindow();

                        self.markerClusterInfoWindows.push(infoWindow);

                        // show infoWindow
                        if (map.getZoom() >= 22) {

                            // create infoWindow content
                            for (let i = 0; i < markers.length; i++) {

                                markers[i].setVisible(false);
                                thisCluster.repaint();

                                let activeSlide = 'active';
                                if (i > 0) {
                                    activeSlide = '';
                                }

                                const contentString = createInfoWindowContent(markers[i].data);

                                clusterMarkersContent += contentString;

                            }

                            infoWindow.setContent('' +
                                '<div class="info-window-slider">' +
                                '<div class="info-window__controls">' +
                                '<div>' +
                                '<span id="info-window__activeIndex">1</span>' +
                                '<span>/' + markers.length + '</span>' +
                                '</div>' +
                                '<div>' +
                                '<button id="btnPrev" class="info-window__prev"><svg width="9" height="15" viewBox="0 0 9 15"><path fill-rule="evenodd" d="M1.198 9.022A1.506 1.506 0 0 1 .222 7.51 1.506 1.506 0 0 1 1.198 6L6.374.823a1.514 1.514 0 1 1 2.14 2.14L3.967 7.511l4.547 4.547a1.514 1.514 0 0 1-2.14 2.14L1.198 9.023z"/></svg></button>' +
                                '<button id="btnNext" class="info-window__next"><svg width="9" height="15" viewBox="0 0 9 15"><path fill-rule="evenodd" d="M7.984 9.022A1.506 1.506 0 0 0 8.96 7.51 1.506 1.506 0 0 0 7.984 6L2.808.823a1.514 1.514 0 1 0-2.14 2.14l4.547 4.548-4.548 4.547a1.514 1.514 0 0 0 2.14 2.14l5.177-5.176z"/></svg></button>' +
                                '</div>' +
                                '</div>' +
                                '<div class="info-window__wrap">' +
                                '' + clusterMarkersContent + '' +
                                '</div>' +
                                '</div>');

                            infoWindow.setPosition(cluster.getCenter());
                            infoWindow.open(map);

                            addClassesInfoWindow();

                            const btnPrev = document.getElementById('btnPrev'),
                                btnNext = document.getElementById('btnNext'),
                                slides = document.getElementsByClassName('info-window'),
                                activeIndexBlock = document.getElementById('info-window__activeIndex');

                            let activeIndex = 0;
                            const firstSliderElem = document.querySelector('.info-window:first-child');
                            firstSliderElem.classList.add('active');

                            btnPrev.addEventListener('click', () => {

                                slides[activeIndex].classList.remove('active');
                                slides[activeIndex].classList.add('to-next');

                                if (slides[activeIndex - 1]) {
                                    slides[activeIndex - 1].classList.add('from-prev');
                                } else {
                                    slides[slides.length - 1].classList.add('from-prev');
                                }

                                setTimeout(() => {
                                    slides[activeIndex].classList.remove('to-next');

                                    if (slides[activeIndex - 1]) {
                                        slides[activeIndex - 1].classList.remove('from-prev');
                                        slides[activeIndex - 1].classList.add('active');
                                        activeIndex -= 1;
                                    } else {
                                        slides[slides.length - 1].classList.remove('from-prev');
                                        slides[slides.length - 1].classList.add('active');
                                        activeIndex = slides.length - 1;
                                    }
                                    activeIndexBlock.innerHTML = (activeIndex + 1) + '';
                                }, 300);

                            });
                            btnNext.addEventListener('click', () => {

                                slides[activeIndex].classList.remove('active');
                                slides[activeIndex].classList.add('to-prev');

                                if (slides[activeIndex + 1]) {
                                    slides[activeIndex + 1].classList.add('from-next');
                                } else {
                                    slides[0].classList.add('from-next');
                                }

                                setTimeout(() => {
                                    slides[activeIndex].classList.remove('to-prev');

                                    if (slides[activeIndex + 1]) {
                                        slides[activeIndex + 1].classList.remove('from-next');
                                        slides[activeIndex + 1].classList.add('active');
                                        activeIndex += 1;
                                    } else {
                                        slides[0].classList.remove('from-next');
                                        slides[0].classList.add('active');
                                        activeIndex = 0;
                                    }
                                    activeIndexBlock.innerHTML = (activeIndex + 1) + '';
                                }, 300)
                            });

                            setEventOnButton();
                        }
                    });
                });
        });
    }

    public ngOnChanges(event): void {
        this.loadMap();
    }
}
