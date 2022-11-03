import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

@Component({
    selector: 'ngx-custom-map',
    templateUrl: './custom-map.component.html',
    styleUrls: ['./custom-map.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomMapComponent implements OnInit {
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

    ngOnInit() {
        this.map = L.map('map').setView([42.867695, 74.610897], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
                '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.map);
        this.map.on('click', (e) => {
            console.log(this.map); // get the coordinates
            if (this.marker !== null) {
                this.map.removeLayer(this.marker);
            }
            this.marker = L.marker(e.latlng).addTo(this.map);
            // L.marker([e.latlng.lat, e.latlng.lng], this.markerIcon).addTo(
            //     this.map
            // ); // add the marker onclick
        });
    }
}
