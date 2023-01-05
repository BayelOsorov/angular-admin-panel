import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    EventEmitter,
    Output,
    Input,
} from '@angular/core';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import { AbstractControl, FormControl } from '@angular/forms';

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png',
});

@Component({
    selector: 'ngx-custom-map',
    templateUrl: './custom-map.component.html',
    styleUrls: ['./custom-map.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomMapComponent implements OnInit {
    @Output() markLocationEvent = new EventEmitter();
    @Input() control: AbstractControl = new FormControl();

    @Input() submitted = false;
    @Input() isRequired = true;
    @Input() baseLocation: [number, number];
    @Input() locations = [];
    map;
    marker = null;
    markerIcon = {
        icon: L.icon({
            iconSize: [25, 41],
            iconAnchor: [10, 41],
            popupAnchor: [2, -40],

            // specify the path here
            iconUrl:
                'https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png',
            shadowUrl:
                'https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png',
        }),
    };
    tooltip = L.Tooltip;
    ngOnInit() {
        this.map = L.map('map').setView(
            this.baseLocation ? this.baseLocation : [42.867695, 74.610897],
            12
        );
        // ! Base Location
        if (this.baseLocation) {
            this.marker = L.marker(this.baseLocation, this.markerIcon).addTo(
                this.map
            );
        }
        // ! List Marks
        if (this.locations.length > 0) {
            this.locations.map((item) => {
                if (item.location) {
                    this.marker = L.marker(
                        item.location.coordinates,
                        this.markerIcon
                    ).addTo(this.map);
                } else if (item.mall) {
                    this.marker = L.marker(
                        item.mall.location.coordinates,
                        this.markerIcon
                    ).addTo(this.map);
                }
            });
        }
        // ! Init Map
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
                '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.map);

        // ! Click Event
        if (this.locations.length === 0) {
            this.map.on('click', (e) => {
                if (this.marker !== null) {
                    this.map.removeLayer(this.marker);
                }
                this.marker = L.marker(e.latlng, this.markerIcon).addTo(
                    this.map
                );
                // this.markLocationEvent.emit([e.latlng.lat, e.latlng.lng]);
                this.control.setValue([e.latlng.lat, e.latlng.lng]);
            });
        }
    }
}
