import { Component, OnInit } from '@angular/core';
import { LocationsService } from '../../services/locations.service';
import { } from '@types/googlemaps';
import { Location } from '../../models/location';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  countries = {};
  countriesLatLong = {};
  latlng: Location[] = new Array();

  constructor(private _locationsService: LocationsService) { }

  ngOnInit() {
    this._locationsService.getCountryLocations().subscribe(data => {
      this.countriesLatLong = data;
    })
  }

  onUploadFinished($event) {
    let responseString = $event.serverResponse.response._body;
    let response = JSON.parse(responseString);
    console.log("Classified as '" + response['label'] + "'");
    this.show(response['locations']);
  }

  show(locations) {
    this.countries = locations;
    this.latlng = this.getArrayOfLocations();
  }

  getArrayOfLocations(): Location[] {
    let latlng = []
    for (let nr in this.countriesLatLong) {
      let info = this.countriesLatLong[nr];
      for (let name in this.countries) {
        if (info["country"] == name) {
          let loc: Location = new Location();
          loc.lat = Number(info["latitude_average"]);
          loc.lng = Number(info["longitude_average"]);
          latlng.push(loc);
        }
      }
    }
    return latlng;
  }


}
