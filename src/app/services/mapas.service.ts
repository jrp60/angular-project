import { Injectable } from '@angular/core';
import { Marcador } from "../interfaces/marcador.interface";

@Injectable({
  providedIn: 'root'
})
export class MapasService {

  // marcadores:Marcador[] = [];
  marcadores = [
    {
      position: { lat: 38.484202837, lng: -0.7677831 },
      options: { titulo: "Explanada de Petrer", draggable: true }
    },
    {
      position: { lat: 38.490, lng: -0.770 },
      options: { titulo: "Otro marcador", draggable: false }
    }
  ];
  constructor(){
    let nuevoMarcador:Marcador = {
      position: { lat:38.484202837, lng:-0.7677831 },
      options: {
      titulo: "Explanada de Petrer",
      draggable: true
      },
    }

    this.marcadores.push(nuevoMarcador);
  }

  insertarMarcador(marcador:Marcador){
    this.marcadores.push(marcador);
    this.guardarMarcadores();
  }

  borrarMarcador(i:number){
    this.marcadores.splice(i,1);
    this.guardarMarcadores();
  }

  guardarMarcadores(){
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }
  cargarMarcadores(){
    if(localStorage.getItem('marcadores')){
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    }
    else{
      this.marcadores = [];
    }
  }
}
