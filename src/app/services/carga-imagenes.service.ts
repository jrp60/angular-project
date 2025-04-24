import { Injectable, inject } from "@angular/core";

// import { AngularFireDatabase } from "@angular/fire/compat/database";
// import { AngularFireStorage } from "@angular/fire/compat/storage";

import {
  Storage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "@angular/fire/storage";
import { Database, ref as dbRef, push, set, get } from "@angular/fire/database";
import { FileItem } from "../models/file-item";
import shortid from "shortid";

@Injectable({
  providedIn: "root",
})
export class CargaImagenesService {
  private CARPETA_IMAGENES: string = "img";
  private storage = inject(Storage);
  private db = inject(Database);

  // private db = getDatabase(); // Initialize Firebase Realtime Database
  // private storage = getStorage(); // Initialize Firebase Storage

  // private db: AngularFireDatabase;
  // private storage: any;

  constructor() // private db: AngularFireDatabase,
  // private storage: AngularFireStorage
  {}

  // private initializeFirebase() {
  //   // const app = initializeApp(environment.FIREBASE); // Initialize Firebase App using environment config
  //   // this.db = getDatabase(app); // Initialize Firebase Realtime Database with the app instance
  //   // this.storage = getStorage(app); // Initialize Firebase Storage with the app instance
  // }

  // public setupFirebase() {
  //   if (!this.db || !this.storage) {
  //     this.initializeFirebase(); // Ensure Firebase is initialized before use
  //   }
  // }

  async getAllImages(): Promise<any> {
    const pathRef = dbRef(this.db, `/${this.CARPETA_IMAGENES}`);
    const snapshot = await get(pathRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.keys(data).map((key) => data[key]);
    }
    return [];
  }

  // getAllImages2(): Promise<any> {
  //   this.setupFirebase();
  //   const dbRef = ref(this.db, `/${this.CARPETA_IMAGENES}`);

  //   return get(dbRef)
  //     .then(async (snapshot) => {
  //       if (snapshot.exists()) {
  //         const imagesData = snapshot.val();
  //         const imageKeys = Object.keys(imagesData);

  //         const imagesWithUrls = imageKeys.map((key) => {
  //           const imageData = imagesData[key];
  //           return imageData;
  //         });

  //         return imagesWithUrls;
  //       } else {
  //         throw new Error("No images found in Firebase Database.");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching images:", error);
  //       throw error;
  //     });
  // }

  uploadImages(archivos: FileItem[]) {
    archivos.forEach((file) => {
      file.nombreArchivo = shortid.generate();

      const filePath = `${this.CARPETA_IMAGENES}/${file.nombreArchivo}`;
      const fileRef = storageRef(this.storage, filePath);
      const uploadTask = uploadBytesResumable(fileRef, file.archivo);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          file.progreso =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.error("Upload error:", error);
        },
        () => {
          getDownloadURL(fileRef).then((downloadURL) => {
            file.url = downloadURL;
            this.guardarImagen({
              nombre: file.nombreArchivo,
              url: file.url,
              user: file.user,
            });
            file.estaSubiendo = false;
          });
        }
      );
    });
  }

  guardarImagen(imagen: any) {
    const imagesListRef = dbRef(this.db, `/${this.CARPETA_IMAGENES}`);
    const newImageRef = push(imagesListRef);
    set(newImageRef, imagen);
  }

  /**
   * Uploads images to Firebase Storage and saves metadata to Firebase Realtime Database.
   *
   * For each file:
   * - Generates a unique filename using `shortid`
   * - Creates a Firebase Storage reference inside the 'img' folder
   * - Uploads the file using `uploadBytesResumable` to track progress
   * - Listens to the upload state to update progress and handle errors
   * - On successful upload, retrieves the download URL
   * - Calls `guardarImagen()` to store image metadata (name, URL, user) in the Realtime Database
   *
   * @param archivos Array of FileItem objects to upload
   */
  // uploadImages2(archivos: FileItem[]) {
  //   this.setupFirebase();
  //   archivos.map((file) => {
  //     const shortid = require("shortid");
  //     file.nombreArchivo = shortid.generate();
  //     const fileRef = storageRef(
  //       this.storage,
  //       `${this.CARPETA_IMAGENES}/${file.nombreArchivo}`
  //     );

  //     // Upload file with progress tracking (using uploadBytesResumable)
  //     const uploadTask = uploadBytesResumable(fileRef, file.archivo);

  //     // Tracking progress during upload
  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot: UploadTaskSnapshot) => {
  //         // Tracking the progress of the upload
  //         file.progreso =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       },
  //       (error) => {
  //         console.log("Error: ", error);
  //       },
  //       () => {
  //         // On successful upload completion, retrieve the download URL
  //         getDownloadURL(fileRef).then((downloadURL) => {
  //           file.url = downloadURL;
  //           this.guardarImagen({
  //             nombre: file.nombreArchivo,
  //             url: file.url,
  //             user: file.user,
  //           });
  //           file.estaSubiendo = false;
  //         });
  //       }
  //     );
  //   });
  // }

  /**
   * Saves the routes of the images in the database
   */
  // guardarImagen2(imagen: any) {
  //   const dbRef = ref(this.db, `/${this.CARPETA_IMAGENES}`); //get the 'img' tree
  //   const newImageRef = push(dbRef); // Create a new node in 'img' tree with a unique key
  //   set(newImageRef, imagen); // Save image under that unique key
  // }
}
