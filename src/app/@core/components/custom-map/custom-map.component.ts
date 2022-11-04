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
    @Input() baseLocation: [number, number];
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
        this.map = L.map('map').setView(
            this.baseLocation ? this.baseLocation : [42.867695, 74.610897],
            12
        );
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
                '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.map);

        this.map.on('click', (e) => {
            if (this.marker !== null) {
                this.map.removeLayer(this.marker);
            }
            this.marker = L.marker(e.latlng, this.markerIcon).addTo(this.map);
            this.markLocationEvent.emit([e.latlng.lat, e.latlng.lng]);
            // L.marker([e.latlng.lat, e.latlng.lng], this.markerIcon).addTo(
            //     this.map
            // ); // add the marker onclick
        });
    }
}
