import { inject, Injectable } from "@angular/core";
import {
  Firestore,
  collection,
  query,
  orderBy,
  limit,
  collectionData,
  addDoc,
  DocumentReference,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Mensaje } from "../interfaces/mensaje.interface";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  public chats: Mensaje[] = [];
  public usuario: any = {};
  public cargados: number = 0;

  private firestore = inject(Firestore);
  private chatsCollectionRef = collection(this.firestore, "chats");

  constructor() {}

  cargarMensajes(): Observable<Mensaje[]> {
    const q = query(
      this.chatsCollectionRef,
      orderBy("fecha", "desc"),
      limit(10)
    );
    return collectionData(q).pipe(
      map((mensajes: Mensaje[]) => {
        this.chats = [];
        for (let mensaje of mensajes) {
          this.chats.unshift(mensaje);
        }
        return this.chats;
      })
    );
  }

  cargarMasMensajes(): Observable<Mensaje[]> {
    this.cargados += 10;
    const q = query(
      collection(this.firestore, "chats"),
      orderBy("fecha", "desc"),
      limit(this.cargados)
    );

    return collectionData(q, { idField: "id" }).pipe(
      map((mensajes: Mensaje[]) => {
        this.chats = [...mensajes].reverse(); // reverse for newest at bottom
        return this.chats;
      }),
      catchError((error) => {
        console.error("Error in cargarMasMensajes (observable):", error);
        return [];
      })
    );
  }

  async agregarMensaje(
    texto: string,
    usuario: string,
    uid: string
  ): Promise<DocumentReference> {
    let mensaje: Mensaje = {
      nombre: usuario,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: uid,
    };
    return await addDoc(this.chatsCollectionRef, mensaje);
  }
}
