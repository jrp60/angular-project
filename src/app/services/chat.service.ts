import { inject, Injectable } from "@angular/core";
import {
  Firestore,
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  DocumentReference,
  collectionSnapshots,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Mensaje } from "../interfaces/mensaje.interface";
import {
  DocumentData,
  getDocs,
  QueryDocumentSnapshot,
  startAfter,
} from "firebase/firestore";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  private firestore = inject(Firestore);
  private chatsCollectionRef = collection(this.firestore, "chats");

  private lastDoc: QueryDocumentSnapshot<DocumentData> | null = null; //QueryDocumentSnapshot from firestore
  private readonly loadLimit = 10;

  constructor() {}

  listenMessages(): Observable<Mensaje[]> {
    const messageQuery = query(
      this.chatsCollectionRef,
      orderBy("fecha", "desc"),
      limit(this.loadLimit)
    );

    return collectionSnapshots(messageQuery).pipe(
      //map because with collectionSnapshot we get the raw data, need to transform QueryDocumentSnapshot[] in Mensaje[]
      //QueryDocumentSnapshot -> docs -> data -> Mensaje
      map((docs) => {
        if (docs.length > 0) {
          this.lastDoc = docs[docs.length - 1];
        }
        return docs.map((doc) => doc.data() as Mensaje).reverse();
      })
    );
  }

  async loadMoreMessages() {
    const messageQuery = this.lastDoc
      ? query(
          this.chatsCollectionRef,
          orderBy("fecha", "desc"),
          startAfter(this.lastDoc),
          limit(this.loadLimit)
        )
      : query(
          this.chatsCollectionRef,
          orderBy("fecha", "desc"),
          limit(this.loadLimit)
        );

    const snap = await getDocs(messageQuery);
    if (snap.empty) return [];

    this.lastDoc = snap.docs[snap.docs.length - 1];

    return snap.docs.map((doc) => doc.data() as Mensaje).reverse();
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
