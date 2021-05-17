import { Component } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { MapasService } from "../../services/mapas.service";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styles: [
  ]
})
 
export class MapsComponent {

  constructor() { }

  lat:number = 38.48420283763195;
  lng:number = -0.7677831619109627;
  zoom:number = 15;

}
