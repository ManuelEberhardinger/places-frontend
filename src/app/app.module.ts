import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './components/app/app.component';
import { WorldMapComponent } from './components/world-map/world-map.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { LocationsService } from './services/locations.service';
import { ImageUploadModule } from "angular2-image-upload";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatSidenavModule,
  MatCardModule,
  MatTabsModule,
  MatDividerModule,
  MatGridListModule} from '@angular/material';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { DiscoverPicturesComponent } from './components/discover-pictures/discover-pictures.component';
import { UploadLandingPageComponent } from './components/upload-landing-page/upload-landing-page.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ImageUploadModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatTabsModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBw0bhw6dYm10O8TeS-GaXPQhqD0ggm3UE'
    }),
    AgmSnazzyInfoWindowModule
  ],
  providers: [
    LocationsService,
    GoogleMapsAPIWrapper
  ],
  declarations: [ AppComponent, LandingPageComponent, ImageUploadComponent, DiscoverPicturesComponent, WorldMapComponent, UploadLandingPageComponent, ContextMenuComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
