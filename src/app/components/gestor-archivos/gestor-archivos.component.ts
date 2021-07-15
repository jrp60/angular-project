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
  archivos:FileItem[] = [];

  constructor(public _cargaImagenes:CargaImagenesService){ }

  ngOnInit(): void {
  }

  archivoSobreDropZone(e:boolean){
    this.estaSobreDropZone = e;    
  }

  cargarImagenesFirebase(){
    this._cargaImagenes.newcharge2(this.archivos);
  }


}
