import { Component } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';


/* @NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDThwGxJqFsSN-etU1MGnLsXBc66dIRYsU'
    })
   ]
 }) */
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styles: [
  ]
})
 
export class MapsComponent {

  constructor() { }

  lat = 51.678418;
  lng = 7.809007;
  zoom=20;

}
