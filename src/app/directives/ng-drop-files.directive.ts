import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from "../models/file-item";

@Directive({
  selector: '[NgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() archivos:FileItem[] = [];
  @Output() archivoSobre:EventEmitter<any> = new EventEmitter();

  constructor(public elemento:ElementRef){ }

  @HostListener('dragenter', ['$event'])
  public onDragEnter(event:any){
    this.archivoSobre.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event:any){
    this.archivoSobre.emit(false);
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(event:any){
    let transferencia = this._getTransferencia(event);

    transferencia.dropEffect = 'copy';

    this._prevenirYdetener(event);

    this.archivoSobre.emit(true);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event:any){
    let transferencia = this._getTransferencia(event);
    if(!transferencia){
      return;
    }
    /* de todos los fatos de la transferencia, agarramos solo los Files */
    this._agregarArchivos(transferencia.files);
    this.archivoSobre.emit(false);
    this._prevenirYdetener(event);
  }

  /* valida que en el evento haya algo que transferir */
  private _getTransferencia(event:any){
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _prevenirYdetener(event:any){
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * Checks if the File can be added
   * 
   * checks if there is not a file with the same name and if is an image
   *
   * @param File   $archivo 
   * 
   * @return boolean
   */ 
  private _archivoPuedeSerCargado(archivo:File){
    if(!this._archivoYaFueDroppeado(archivo.name) && this._esImagen(archivo.type)){
      return true;
    }
    return false;
  }

  /**
   * Checks if there is a file with the same name
   * 
   * it loops the array of Files of the directive (this.archivos) checking if there is some with the same name of the parameter
   *
   * @param string   $nombreArchivo 
   * 
   * @return boolean
   */ 
  private _archivoYaFueDroppeado(nombreArchivo:string):boolean{
    for(let i in this.archivos){
      let arch = this.archivos[i];
      if(arch.archivo.name === nombreArchivo){
        console.log("Archivo ya existe en la lista", nombreArchivo);
        return true;
      }
    }
    return false;
  }

  private _esImagen(tipoArchivo:string):boolean{
    return(tipoArchivo == '' || tipoArchivo == undefined) ? false : tipoArchivo.startsWith("image");
  }


  /**
   * Add FileItems to the directive array of FileItems
   * 
   * it loops the file list taking the names, checks if the files can be charged; if so create a new FileItem(our model)
   * from the file of the list and we pushed it to de array of FileItems of the directive
   *
   * @param FileList   $archivosLista  a list of Files we want to add
   * 
   * @return void
   */ 
  private _agregarArchivos(archivosLista:FileList){
    /*  console.log(archivosLista); */
     for(let propiedad in Object.getOwnPropertyNames(archivosLista)){
       let archTemporal = archivosLista[propiedad];
       if(this._archivoPuedeSerCargado(archTemporal)){
         let nuevoArchivo = new FileItem(archTemporal);
         this.archivos.push(nuevoArchivo);
       }
     }
     console.log(this.archivos);
   }

}
