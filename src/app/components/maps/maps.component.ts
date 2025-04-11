import { Component, ViewChild, ElementRef } from "@angular/core";
import { Toast } from "bootstrap";
import { MapasService } from "../../services/mapas.service";
import { Marcador } from "src/app/interfaces/marcador.interface";

@Component({
  selector: "app-maps",
  templateUrl: "./maps.component.html",
  styles: [],
})
export class MapsComponent {
  @ViewChild("toastElement") toastElement!: ElementRef;
  mapOptions: google.maps.MapOptions;

  constructor(public _ms: MapasService) {
    this._ms.cargarMarcadores();

    this.mapOptions = {
      center: {
        lat: this._ms.marcadores[0]?.position.lat || 38.484202837,
        lng: this._ms.marcadores[0]?.position.lng || -0.7677831,
      },
      zoom: 15,
      mapTypeId: "roadmap",
    };
  }

  lat: number = 38.48420283763195;
  lng: number = -0.7677831619109627;
  zoom: number = 15;

  marcadorSel: Marcador = null;
  draggable: string = "1";

  clickMapa(evento) {
    let nuevoMarcador: Marcador = {
      position: {
        lat: evento.latLng.lat(),
        lng: evento.latLng.lng(),
      },
      options: {
        titulo: "sin titulo",
        draggable: true,
      },
    };
    this._ms.insertarMarcador(nuevoMarcador);
  }

  /* FIX and fix modal */
  clickMarcador(marcador: Marcador, i: number) {
    this.marcadorSel = marcador;

    if (this.marcadorSel.options.draggable) {
      this.draggable = "1";
    } else {
      this.draggable = "0";
    }
  }

  dragEndMarcador(marcador: Marcador, event) {
    let lat = event.coords.lat;
    let lng = event.coords.lng;

    marcador.position = { lat: lat, lng: lng };
    this._ms.guardarMarcadores();
  }

  cambiarDraggable() {
    if (this.draggable == "1") {
      this.marcadorSel.options.draggable = true;
    } else {
      this.marcadorSel.options.draggable = false;
    }
  }

  saveMarcador() {
    this._ms.guardarMarcadores();
    this.mostrarToast();
  }

  mostrarToast() {
    const toast = new Toast(this.toastElement.nativeElement);
    toast.show();
  }
}
