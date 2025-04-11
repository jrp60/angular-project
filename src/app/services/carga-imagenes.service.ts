import { Injectable } from "@angular/core";
import { getDatabase, ref, set, get, push } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
  UploadTaskSnapshot,
  uploadBytesResumable,
} from "firebase/storage";
import { FileItem } from "../models/file-item";

@Injectable({
  providedIn: "root",
})
export class CargaImagenesService {
  private CARPETA_IMAGENES: string = "img";
  private db = getDatabase(); // Initialize Firebase Realtime Database
  private storage = getStorage(); // Initialize Firebase Storage

  constructor() {}

  getAllImages(): Promise<any> {
    const dbRef = ref(this.db, `/${this.CARPETA_IMAGENES}`);

    return get(dbRef)
      .then(async (snapshot) => {
        if (snapshot.exists()) {
          const imagesData = snapshot.val();
          const imageKeys = Object.keys(imagesData);

          const imagesWithUrls = imageKeys.map((key) => {
            const imageData = imagesData[key];
            return imageData;
          });

          return imagesWithUrls;
        } else {
          throw new Error("No images found in Firebase Database.");
        }
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        throw error;
      });
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
  uploadImages(archivos: FileItem[]) {
    archivos.map((file) => {
      const shortid = require("shortid");
      file.nombreArchivo = shortid.generate();
      const fileRef = storageRef(
        this.storage,
        `${this.CARPETA_IMAGENES}/${file.nombreArchivo}`
      );

      // Upload file with progress tracking (using uploadBytesResumable)
      const uploadTask = uploadBytesResumable(fileRef, file.archivo);

      // Tracking progress during upload
      uploadTask.on(
        "state_changed",
        (snapshot: UploadTaskSnapshot) => {
          // Tracking the progress of the upload
          file.progreso =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log("Error: ", error);
        },
        () => {
          // On successful upload completion, retrieve the download URL
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

  /**
   * Saves the routes of the images in the database
   */
  guardarImagen(imagen: any) {
    const dbRef = ref(this.db, `/${this.CARPETA_IMAGENES}`); //get the 'img' tree
    const newImageRef = push(dbRef); // Create a new node in 'img' tree with a unique key
    set(newImageRef, imagen); // Save image under that unique key
  }
}
