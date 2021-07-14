import { Component, OnInit } from '@angular/core';
import { FileItem } from 'src/app/models/file-item';
import { CargaImagenesService } from 'src/app/services/carga-imagenes.service';

@Component({
  selector: 'app-gestor-archivos',
  templateUrl: './gestor-archivos.component.html',
  styles: [
  ]
})
export class GestorArchivosComponent implements OnInit {

  estaSobreDropZone:boolean = false;
  permiteCargar:boolean = true;
  archivos:FileItem[] = [];

  constructor(public _cargaImagenes:CargaImagenesService){ }

  ngOnInit(): void {
  }

  archivoSobreDropZone(e:boolean){
    this.estaSobreDropZone = e;    
  }

  cargarImagenesFirebase(){
    this.permiteCargar = false;
    this._cargaImagenes.charge_images(this.archivos);
  }

  limpiarArchivos(){
    this.archivos = [];
    this.permiteCargar = true;
  }

}
