import { Component } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { MapasService } from "../../services/mapas.service";
import { FormsModule } from '@angular/forms';
import { Marcador } from 'src/app/interfaces/marcador.interface';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styles: [
  ]
})
 
export class MapsComponent {

  constructor(public _ms:MapasService) {
    this._ms.cargarMarcadores();
   }

  lat:number = 38.48420283763195;
  lng:number = -0.7677831619109627;
  zoom:number = 15;

  marcadorSel:Marcador = null;
  draggable:number = 1;

  clickMapa(evento){
    console.log(evento);
    console.log("hola");
    
    let nuevoMarcador:Marcador = {
      lat: evento.coords.lat,
      lng: evento.coords.lng,
      titulo: "sin titulo",
      draggable: true
    }
    this._ms.insertarMarcador(nuevoMarcador);
  }

  clickMarcador(marcador:Marcador, i:number){
    this.marcadorSel = marcador;
    this.draggable
    if(this.marcadorSel.draggable){
      this.draggable = 1;
    }else{
      this.draggable = 0;
    }
  }

  dragEndMarcador(marcador:Marcador, event){
    let lat = event.coords.lat;
    let lng = event.coords.lng;

    marcador.lat = lat;
    marcador.lng = lng;

    this._ms.guardarMarcadores();
  }

  cambiarDraggable(){
    if(this.draggable==1){
      this.draggable = 0;
    }else{
      this.draggable = 1;
    }
  }

}
