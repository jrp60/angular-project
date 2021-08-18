import { Component } from '@angular/core';
import { CargaImagenesService } from "../../../services/carga-imagenes.service";

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styles: [
  ]
})
export class FotosComponent {

  files = [];
  images = [];
  cargadas:number = 0;
  startAt:number = 0;
  noData:boolean = false;

  constructor(public _cargaImagenes:CargaImagenesService){
    _cargaImagenes.getAllImages().then(value =>{ 
      this.files = value.val();
      let arr = []; 
      if(this.files != null){
        Object.keys(this.files).map((key, i=0)=>{ 
          
          arr.push({[i]:this.files[key]});
          i++;  
        });  
        this.images = arr;
        this.cargadas += this.images.length;
      } 
    });

    setTimeout(() => {
      if(this.cargadas == 0){
        this.noData = true;
      }
    }, 1000);
    
  }

  /*Not used*/
  cargarMasImagenes(){
    this.startAt = this.cargadas;
    this._cargaImagenes.fromStartToEnd(this.startAt.toString()).then(value =>{ 
      this.files = value.val();
      let arr = [];  
      if(this.files == null){
        return;
      }
      let firstTime = true;
      let count=0;
      Object.keys(this.files).map((key, i=this.startAt)=>{
        if(firstTime){
          count=this.startAt;
          firstTime = false;
        }
        i=count;
        arr.push({[i]:this.files[key]});
        i++;
        count++; 
      });  

      this.images = this.images.concat(arr);
      this.cargadas += this.images.length;
    });
  }

}
