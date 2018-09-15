import { Component, OnInit, AfterViewInit, Input, ViewChild } from '@angular/core';
import { GoogleMapsAPIWrapper, MapsAPILoader, AgmMap, LatLngBounds } from '@agm/core';
import { Location } from '../../models/location';
import { ZoomState } from '../../models/zoom-state';
import { environment } from '../../../environments/environment';

declare const google: any;

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.css']
})
export class WorldMapComponent implements AfterViewInit {

  @Input() latlng: Location[];
  @Input() originalLatLng: Location[];

  map: any;

  zoomState: ZoomState = ZoomState.WORLD;

  zoom: number = 2;
  bounds: LatLngBounds;

  centerLat: number;
  centerLng: number;

  infoWindowOpened = null;

  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;

  environment = environment.production;

  @ViewChild('AgmMap') agmMap: any;

  constructor(private mapsWrapper: GoogleMapsAPIWrapper) { }

  ngAfterViewInit() {
    this.initMap();
  }

  mapReady(event: any) {
    this.map = event;
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('goBack'));
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('showAll'));
  }

  zoomMarkers(loc: Location, infoWindow) {
    switch (this.zoomState) {
      case ZoomState.WORLD: {
        this.zoomToCountry(loc);
        break;
      }
      case ZoomState.CONTINENT: {

      }
      case ZoomState.COUNTRY: {
        if (this.infoWindowOpened === infoWindow)
          return;

        if (this.infoWindowOpened !== null)
          this.infoWindowOpened.close();

        this.infoWindowOpened = infoWindow;
        this.openPlaceInformation(loc);
      }
    }

  }

  openPlaceInformation(loc: Location) {
    if (loc.id && loc.id.length > 0) {

    }
  }

  initMap() {
    this.infoWindowOpened = null;
    this.disableContextMenu();
    this.zoom = 2;
    this.zoomState = ZoomState.WORLD;
    this.bounds = <LatLngBounds>new google.maps.LatLngBounds(
      new google.maps.LatLng(85, -180),           // top left corner of map
      new google.maps.LatLng(-85, 180)            // bottom right corner
    );
  }

  initMapAgain() {
    this.initMap();
    this.latlng = [];
    this.latlng = this.originalLatLng.slice(0);
  }

  zoomToCountry(loc: Location) {
    this.latlng = [];
    let newBounds: LatLngBounds = <LatLngBounds>new google.maps.LatLngBounds();
    for (var marker in loc.places) {
      let toAdd = new Location();
      toAdd.id = marker;
      let place = loc.places[marker]['attributes']['table'];
      if (place['city'] == null) {
        toAdd.name = place['country'];
      } else {
        toAdd.name = place['city'];
      }
      if (place['position']) {
        toAdd.lat = place['position']['latitude'];
        toAdd.lng = place['position']['longitude'];
        this.latlng.push(toAdd);
        newBounds.extend(new google.maps.LatLng(toAdd.lat, toAdd.lng));
      }
    }
    this.zoomState = ZoomState.COUNTRY;
    this.bounds = newBounds;
  }

  clickedMap($event) {
    if (this.infoWindowOpened) {
      this.infoWindowOpened.close();
    }
    this.disableContextMenu();
  }

  showContextMenu($event) {
    if (this.infoWindowOpened) {
      this.infoWindowOpened.close();
    }
    let m: MouseEvent = event as MouseEvent;
    this.contextmenuX = m.clientX;
    this.contextmenuY = m.clientY;
    this.contextmenu = true;
  }

  //disables the menu
  disableContextMenu() {
    this.contextmenu = false;
  }

  getTripadvisorUrl(searchTerm: string) {
    let url = "https://www.tripadvisor.com/Search?q=";
    searchTerm = searchTerm.replace(/ /g, "+");
    url = url + searchTerm;
    return url;
  }

  getAirbnbUrl(searchTerm: string) {
    let url = "https://www.airbnb.de/s/";
    searchTerm = searchTerm.replace(/ /g, "-");
    url = url + searchTerm + "/";
    return url;
  }
}
