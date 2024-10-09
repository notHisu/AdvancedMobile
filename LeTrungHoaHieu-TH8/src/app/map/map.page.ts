import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { GmapsService } from '../services/gmaps/gmaps.service';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  @ViewChild('map', { static: true }) mapElement!: ElementRef;
  map: any;

  constructor(private gmaps: GmapsService) {}

  ngOnInit(): void {
    this.loadMap();
  }

  getCurrentLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      const locOptions = {
        maximumAge: 3000,
        timeout: 5000,
        enableHighAccuracy: true,
      };
      Geolocation.getCurrentPosition(locOptions)
        .then((position) => resolve(position))
        .catch((error) => reject(error));
    });
  }

  async loadMap() {
    try {
      console.log('Loading Google Maps...');
      let googleMaps: any = await this.gmaps.loadGoogleMaps();
      console.log('Google Maps loaded:', googleMaps);

      const position = await this.getCurrentLocation();
      console.log('Current position:', position);

      const location = new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      );
      console.log('Location:', location);

      let mapOptions = {
        center: location,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      };
      console.log('Map options:', mapOptions);

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      console.log('Map initialized:', this.map);
    } catch (e) {
      console.log('Error loading map:', e);
    }
  }

  /*   async loadMap() {
    try {
      const position = await this.getCurrentLocation();
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      this.showMap(latitude, longitude);
    } catch (e) {
      console.log(e);
    }
  }

  showMap(latitude: any, longitude: any) {
    let latLng = new google.maps.LatLng(latitude, longitude);
    let mapOptions = {
      center: latLng,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  } */
}
