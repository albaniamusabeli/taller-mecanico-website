import { Component, OnInit } from '@angular/core';
import { Map, marker, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    const map = new Map('map').setView([-33.01161, -71.54186], 13);

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 17,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Marcador con direccion del Taller
    const markerItem = marker([-32.997126, -71.516842]).addTo(map).bindPopup("Vilches & Murillo");

    // Centrar camara en el marcador
    map.fitBounds([
      // Latitud y Longitud
      [markerItem.getLatLng().lat, markerItem.getLatLng().lng ]
    ]);

  }

}
