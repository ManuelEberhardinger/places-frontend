import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LocationsService } from '../../services/locations.service';
import { Location } from '../../models/location';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-upload-landing-page',
  templateUrl: './upload-landing-page.component.html',
  styleUrls: ['./upload-landing-page.component.css']
})
export class UploadLandingPageComponent implements OnInit, AfterViewInit {

  isUploaded: boolean = false;
  countries = {};
  countriesLatLong = {};
  latlng: Location[] = new Array();
  height: number;
  div: any;
  label: any;

  // styles
  orange: string = '#DE7600';
  blue: string = '#0060EE';
  yellow: string = '#FFCD4F';

  customStyle = {
    selectButton: {
      "background-color": this.orange,
      "border": "none",
      "font-size": "100px",
      "color": "#fff",
      "vertical-align": "center",
      "box-shadow": "none",
      "position": "absolute",
      "height": "100%",
      "top": "40%",
      "align-items": "center",
      "animation": "blinker 3s linear infinite"
    },
    clearButton: {
    },
    layout: {
      "background-color": this.orange,
      "text-align": "center",
      "height": this.height
    },
    previewPanel: {
    }
  }

  constructor(private _locationsService: LocationsService) { }

  ngOnInit() {
    this._locationsService.getCountryLocations().subscribe(data => {
      this.countriesLatLong = data;
    })
  }

  ngAfterViewInit() {
    this.height = window.innerHeight;
    this.div = document.getElementById("upload-container");
    this.div.style.height = this.height + "px";

    var parent = <HTMLElement>document.getElementsByClassName("img-ul-button").item(0);
    var span = parent.getElementsByTagName("span").item(0);
    var icon = document.createElement("i");
    icon.classList.add("far");
    icon.classList.add("fa-arrow-alt-circle-up");
    icon.style.display = "block";
    parent.style.alignItems = "center";
    parent.style.width = (window.innerWidth / 2) + "px";
    parent.style.left = "25%";
    parent.replaceChild(icon, span);

    setTimeout(function() {
      this.label = document.createElement("span");
      this.label.style.fontSize = "50px";
      this.label.innerText = "Show me your picture...";
      parent.appendChild(this.label);
    }, 2000)
  }

  onUploadFinished($event) {
    if(!environment.production) {
      this._locationsService.getLocations("test").subscribe(locations => this.show(locations));
    }
    let responseString = $event.serverResponse.response._body;
    let response = JSON.parse(responseString);
    console.log("Classified as '" + response['label'] + "'");
    this.show(response['locations']);
  }

  onUploadStateChanged(state: boolean) {
    this.isUploaded = true;
    this.div.style.height = "0px";
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
          loc.name = name;
          loc.places = this.countries[name];
          latlng.push(loc);
        }
      }
    }
    return latlng;
  }
}
