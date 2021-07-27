import { Component, OnInit } from '@angular/core';
import { FileItem } from 'src/app/models/file-item';
import { CargaImagenesService } from 'src/app/services/carga-imagenes.service';
import { AuthFirebaseService } from "../../services/authfirebase.service";

@Component({
  selector: 'app-gestor-archivos',
  templateUrl: './gestor-archivos.component.html',
  styles: [
  ]
})
export class GestorArchivosComponent implements OnInit {

  estaSobreDropZone:boolean = false;
  archivos:FileItem[] = [];
  isLogged:boolean;

  constructor(public _cargaImagenes:CargaImagenesService,
              public authService: AuthFirebaseService,){
                this.isLogged = authService.isLoggedIn;
              }

  ngOnInit(): void {
  }

  archivoSobreDropZone(e:boolean){
    this.estaSobreDropZone = e;    
  }

  cargarImagenesFirebase(){
    this._cargaImagenes.charge_images(this.archivos);
  }


}
