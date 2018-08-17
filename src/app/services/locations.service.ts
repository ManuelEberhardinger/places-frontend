import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class LocationsService {

  url: string  = "/places/{label}";
  countryLocationsUrl = "/static/assets/country-locations.json";
  labelsUrl = "/labels";
  imageUrl = "/image/{id}"

  constructor(private http: HttpClient) {
  }

  getLocations(label: string) {
    if(!environment.production) {
      return this.http.get("/assets/mocks/json/beach.json");
    }
    let url = this.url.replace("{label}", label);
    return this.http.get(url);
  }

  getCountryLocations() {
    return this.http.get(this.countryLocationsUrl);
  }

  getAllLabels() {
    if(!environment.production) {
      return Observable.of(["Forest", "Glacier", "Galaxy", "Jungle", "Beach", "Desert", "Mountains", "Sea"]);
    }
    return this.http.get(this.labelsUrl);
  }

  getImageById(id: string) {
    let url = this.url.replace("{id}", id);
    return this.http.get(url);
  }

}
