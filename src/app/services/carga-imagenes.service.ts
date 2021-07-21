import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from 'firebase/app';
import { FileItem } from '../models/file-item';
import 'firebase/storage';  

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {
  private CARPETA_IMAGENES:string = 'img';

  constructor(public af:AngularFireDatabase){}

  getAllImages():Promise<any>{
    const query = this.af.database.ref('img').orderByKey();
    return query.once('value', function (){});
  }

  /* Not used */
  fromStartToEnd(startAt:string):Promise<any>{
    const query = this.af.database.ref('img').orderByKey().startAt(startAt).limitToLast(9);
    return query.once('value', function (){});
  }

  /* Not used */
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

  /* Not used */
  newcharge(archivos: FileItem[]){
    const promises = archivos.map((file, index) => {
      let ref = firebase.storage().ref(`img/${file.archivo.name}`);
      return ref.put(file[index]).then(() => ref.getDownloadURL());
    })
    Promise.all(promises)
      .then((uploadedMediaList) => {
        console.log(uploadedMediaList, 'all');
      })
      .catch((err) => alert(err.code));
  }

  charge_images(archivos: FileItem[]){
    archivos.map((file, index) => {
      const shortid = require('shortid');
      file.nombreArchivo = shortid.generate();
      let ref = firebase.storage().ref().child(`${this.CARPETA_IMAGENES}/${file.nombreArchivo}`);
      ref.put(file.archivo).on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      (snapshot) =>{
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
          this.guardarImagen({nombre:file.nombreArchivo, url:file.url});
          file.estaSubiendo = false;
        });
      }
    );
    })
  }

  /**  NOT USED 
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
  old_charge_images(archivos: FileItem[]){
    let storageRef = firebase.storage().ref();
    for(let item of archivos){
      item.estaSubiendo = true;
      var uploadTask = storageRef.child(`${this.CARPETA_IMAGENES}/${item.nombreArchivo}`).put(item.archivo);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot)=> {
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
   * @param any   $imagen 
   * 
   * @return void
  */
  guardarImagen(imagen:any){
    this.af.list(`/${this.CARPETA_IMAGENES}`).push(imagen);
  }
}