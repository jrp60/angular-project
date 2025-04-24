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
  CollectionReference,
  getDocs,
  collectionSnapshots,
} from "@angular/fire/firestore";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Mensaje } from "../interfaces/mensaje.interface";



@Injectable({
  providedIn: "root",
})
export class ChatService {
  public chats: Mensaje[] = [];
  public usuario: any = {};
  public cargados: number = 0;
  mensajes$: Observable<Mensaje[]>;

  private firestore = inject(Firestore);
  private chatsCollectionRef = collection(this.firestore, "chats");

  // constructor() {
  //   this.mensajes$ = collectionData(this.chatsCollectionRef) as Observable<
  //     Mensaje[]
  //   >;
  // }

  constructor() {
    const q = query(this.chatsCollectionRef, orderBy("fecha", "asc"));

    this.mensajes$ = collectionData(q) as Observable<Mensaje[]>;
    console.log("MENSAJES : ", this.mensajes$);
  }

  // Fetching all chats
  // async getChats() {
  //   const q = query(this.chatsCollectionRef); // Create a query
  //   console.log("Query created:", q);

  //   try {
  //     const querySnapshot = await getDocs(q); // Execute the query to get docs
  //     console.log("Query Snapshot:", querySnapshot);
  //     querySnapshot.forEach((doc) => {
  //       console.log(doc.id, " => ", doc.data()); // Log each document's ID and data
  //     });
  //   } catch (error) {
  //     console.error("Error getting documents: ", error); // Log error if query fails
  //   }
  // }

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
      collection(this.firestore, "chats"), // make sure this comes from angular/fire
      orderBy("fecha", "desc"),
      limit(this.cargados)
    );

    return collectionData(q, { idField: "id" }).pipe(
      map((mensajes: Mensaje[]) => {
        console.log("Mensajes recibidos (observable):", mensajes);
        this.chats = [...mensajes].reverse(); // reverse for newest at bottom
        return this.chats;
      }),
      catchError((error) => {
        console.error("Error in cargarMasMensajes (observable):", error);
        return [];
      })
    );
  }

  cargarTest() {
    const colRef = collection(this.firestore, 'chats');
    const mensajesQuery = query(colRef);
  
    // ✅ Le pasamos un Query explícito
    return collectionData(mensajesQuery, { idField: 'id' }); // opcional: incluir ID en el resultado
  }
  

  cargarTest2() {
    console.log("🔥 cargarTest2 - INIT");
    const col = collection(this.firestore, "chats");
    console.log("query: ", col);
  
    return collectionSnapshots(query(col)).pipe( // ✅ importante: asegurarnos de pasar un Query
      tap((snaps) => console.log("✅ cargarTest2 - snapshots:", snaps)),
      map((snaps) => {
        const parsed = snaps.map((snap) => ({
          id: snap.id,
          ...(snap.data() as Mensaje),
        }));
        console.log("✅ cargarTest2 - parsed mensajes:", parsed);
        return parsed;
      }),
      catchError((error) => {
        console.error("❌ cargarTest2 - ERROR:", error);
        return of([]);
      })
    );
  }

  obtenerMensajes() {
    const mensajesRef = collection(this.firestore, 'chats');
    const mensajesQuery = query(mensajesRef);
  
    return collectionData(mensajesQuery, { idField: 'id' }).pipe(
      tap((mensajes) => console.log("📦 Mensajes recibidos:", mensajes)),
      catchError((err) => {
        console.error("❌ Error al cargar mensajes:", err);
        return of([]);
      })
    );
  }

  escucharMensajes() {
    const mensajesRef = collection(this.firestore, 'chats');
    const mensajesQuery = query(mensajesRef);
  
    return collectionSnapshots(mensajesQuery).pipe(
      map((snaps) =>
        snaps.map((snap) => ({
          id: snap.id,
          ...(snap.data() as Mensaje),
        }))
      ),
      tap((mensajes) => console.log("📡 Mensajes en tiempo real:", mensajes)),
      catchError((err) => {
        console.error("❌ Error en escucharMensajes:", err);
        return of([]);
      })
    );
  }
  
  
  
  cargarMasMensajeswrong(): Observable<Mensaje[]> {
    this.cargados += 10;
    const q = query(
      this.chatsCollectionRef,
      orderBy("fecha", "desc"),
      limit(this.cargados)
    );
    console.log("Query for cargarMensajes:", q);

    return collectionData(q).pipe(
      map((mensajes: Mensaje[]) => {
        console.log("Fetched more messages:", mensajes);
        this.chats = [];
        for (let mensaje of mensajes) {
          this.chats.unshift(mensaje);
        }
        return this.chats;
      }),
      catchError((err) => {
        console.error("Error in cargarMasMensajes:", err);
        return [];
      })
    );
  }

  async cargarMasMensajesManual() {
    this.cargados += 10;
    const q = query(
      this.chatsCollectionRef,
      orderBy("fecha", "desc"),
      limit(this.cargados)
    );

    console.log("Query for cargarMasMensajesManual:", q);

    try {
      const querySnapshot = await getDocs(q);
      const mensajes: Mensaje[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data() as Mensaje;
        mensajes.unshift({ ...data, uid: doc.id }); // unshift to keep order
      });

      console.log("Mensajes recibidos manualmente:", mensajes);
      this.chats = mensajes;
      return mensajes;
    } catch (error) {
      console.error("Error fetching mensajes manualmente:", error);
      return [];
    }
  }

  // cargarMasMensajes(): Observable<Mensaje[]> {
  //   console.log("Fetching more messages...");
  //   this.cargados += 10;
  //   const q = query(
  //     this.chatsCollectionRef,
  //     orderBy("fecha", "desc"),
  //     limit(this.cargados)
  //   );

  //   // Log the query for verification
  //   console.log("Query for cargarMasMensajes:", q);

  //   return collectionData(q).pipe(
  //     map((mensajes: Mensaje[]) => {
  //       console.log("Fetched more messages:", mensajes); // Log the messages

  //       this.chats = [];
  //       for (let mensaje of mensajes) {
  //         this.chats.unshift(mensaje);
  //       }
  //       console.log("Reversed chats:", this.chats); // Log reversed chats
  //       return this.chats;
  //     }),
  //     catchError((error) => {
  //       console.error("Error fetching more messages:", error);
  //       throw error;
  //     })
  //   );
  // }

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
