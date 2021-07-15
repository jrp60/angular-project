import { Injectable } from '@angular/core';
//import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from 'firebase/app';
import { FileItem } from '../models/file-item';

import 'firebase/storage';  
//import { url } from 'inspector';


@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {
  private CARPETA_IMAGENES:string = 'img';

  constructor(public af:AngularFireDatabase){
  }

  lastNImages(n:number):Promise<any>{
    const query = this.af.database.ref('img').orderByKey().limitToLast(n);

    return query.once('value', function (){});
  }

  listaUltimasImagenes(){
    const dbRef = firebase.database().ref();
    let a = dbRef.get().then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  newcharge(archivos: FileItem[]){
    const promises = archivos.map((file, index) => {
      console.log(file);
      
      let ref = firebase.storage().ref(`img/${file.archivo.name}`);
      return ref.put(file[index]).then(() => ref.getDownloadURL());
    })
    Promise.all(promises)
      .then((uploadedMediaList) => {
        console.log(uploadedMediaList, 'all');
      })
      .catch((err) => alert(err.code));
  }

  newcharge2(archivos: FileItem[]){
    archivos.map((file, index) => {
      //console.log(file);
      
      let ref = firebase.storage().ref().child(`${this.CARPETA_IMAGENES}/${file.nombreArchivo}`);
      ref.put(file.archivo).on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      (snapshot) =>{
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        //console.log(snapshot);
          
        file.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
        

      }, function(error) {
        console.log("Error: ", error);
      }, ()=> {
        // Upload completed successfully, now we can get the download URL
        console.log("upload completed successfully");
        ref.getDownloadURL().then((downloadURL)=> {
          file.url = downloadURL;
          console.log("downloadURL",downloadURL);
          
          console.log("ITEM ", file);

          
          this.guardarImagen({nombre:file.nombreArchivo, url:file.url});
          file.estaSubiendo = false;
          
        });
        
      }
    );
    })
   /*  Promise.all(promises)
      .then((uploadedMediaList) => {
        console.log(uploadedMediaList, 'all');
      })
      .catch((err) => alert(err.code)); */
  }

  /**
   * Add images to the firebase
   * 
   * first charges the reference of the storage of firebase, the loops all the files we want to upload, for each one sets the estaSubiendo to true
   * and then we do a reference to the upload task of firebse with our img folder and the name of the file. We use the reference(uploadTask) to get 
   * information of the upload status(snapshot-current status of the upload),(error-to manage if some error happens),()-when everything goes ok we get
   * the url when the image is saved and finally call to guardarImagen()
   *
   * @param FileItem   $archivos 
   * 
   * @return boolean
   */
  charge_images(archivos: FileItem[]){
    let storageRef = firebase.storage().ref();

    for(let item of archivos){
      console.log("ITEM LOOP");
      
      item.estaSubiendo = true;
      var uploadTask = storageRef.child(`${this.CARPETA_IMAGENES}/${item.nombreArchivo}`).put(item.archivo);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot)=> {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          console.log(snapshot);
          
          item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
            case firebase.storage.TaskState.SUCCESS:
              console.log('Upload is SUCCESS');
              
              break;
          }
          

        }, function(error) {
          console.log("Error: ", error);
        }, ()=> {
          // Upload completed successfully, now we can get the download URL
          console.log("upload completed successfully");
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=> {
            item.url = downloadURL;
            console.log("downloadURL",downloadURL);
            
            console.log("ITEM ", item);

            
            this.guardarImagen({nombre:item.nombreArchivo, url:item.url});
            item.estaSubiendo = false;
            
          });
          
        }
      );
    }
  }

  /**
   * Saves the routes of the images in the database
   * 
   * 
   *
   * @param any   $imagen 
   * 
   * @return void
  */
  guardarImagen(imagen:any){
    console.log("GUARDAR IMAGEN");
    
    this.af.list(`/${this.CARPETA_IMAGENES}`).push(imagen);

    // Deprecated
    /* const afList = this.af.list(`/${this.CARPETA_IMAGENES}`);
    afList.push({ name: 'item' });
    const listObservable = afList.snapshotChanges();
    listObservable.subscribe(); */

  }
}