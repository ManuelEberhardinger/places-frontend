import { Component, OnInit } from '@angular/core';
import { LocationsService } from '../../services/locations.service';
import { Location } from '../../models/location';

@Component({
  selector: 'app-discover-pictures',
  templateUrl: './discover-pictures.component.html',
  styleUrls: ['./discover-pictures.component.css']
})
export class DiscoverPicturesComponent implements OnInit {

  countries = {};
  countriesLatLong = {};
  latlng: Location[] = new Array();
  labels: any;

  constructor(private _locationsService: LocationsService) { }

  ngOnInit() {
    this._locationsService.getCountryLocations().subscribe(data => {
      this.countriesLatLong = data;
    })
    this._locationsService.getAllLabels().subscribe(data => {
      console.log(data);
      this.labels = data;
    });
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

  showClick(label) {
    this._locationsService.getLocations(label).subscribe(data => {
      this.countries = data
      this.latlng = this.getArrayOfLocations();
    });
  }

}
