import { Component, OnInit } from '@angular/core';
import { CargaImagenesService } from "../../../services/carga-imagenes.service";
import { AngularFireList } from  '@angular/fire/database';

import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styles: [
  ]
})
export class FotosComponent implements OnInit {

  imagenes = [];
  keys = [];


  constructor(public _cargaImagenes:CargaImagenesService){
    //this.imagenes = _cargaImagenes.lastNImages(10);
    _cargaImagenes.lastNImages(10).then(value =>{ 
      this.imagenes = value.val();
      //this.keys = value.val();
      console.log("KEYSS", this.keys);
      
      
      console.log("IMAGENES EN COMPONENT",this.imagenes);
      let arr = [];  
      Object.keys(this.imagenes).map((key, i=0)=>{ 
        console.log("key:",key);
        
        arr.push({[i]:this.imagenes[key]});
        i++;
        //return arr;  
      });  
      console.log('Object=',this.imagenes);
      console.log('Array=',arr);
      this.keys = arr;
    });

    console.log("IMAGENES EN COMPONENT fuera",this.imagenes);

    
    
    
  }

  ngOnInit(): void {
  }

}
