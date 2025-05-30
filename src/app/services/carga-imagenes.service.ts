import { Injectable, inject } from "@angular/core";
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

  constructor() {}

  async getAllImages(): Promise<any> {
    const pathRef = dbRef(this.db, `/${this.CARPETA_IMAGENES}`);
    const snapshot = await get(pathRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.keys(data).map((key) => data[key]);
    }
    return [];
  }

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
}
