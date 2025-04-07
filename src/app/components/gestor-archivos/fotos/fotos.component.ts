import { Component } from "@angular/core";
import { CargaImagenesService } from "../../../services/carga-imagenes.service";

@Component({
  selector: "app-fotos",
  templateUrl: "./fotos.component.html",
  styles: [],
})
export class FotosComponent {
  files = [];
  images = [];
  cargadas: number = 0;
  startAt: number = 0;
  noData: boolean = false;

  constructor(public _cargaImagenes: CargaImagenesService) {
    _cargaImagenes
      .getAllImages()
      .then((value) => {
        this.files = value;
        this.images = [];
        if (this.files != null) {
          this.files.forEach((file, i) => {
            this.images.push(file);
          });
          this.cargadas += this.images.length;
        } else {
          this.noData = true;
        }
      })
      .catch((error) => {
        console.error("Error fetching images in component:", error);
      });
  }
}
