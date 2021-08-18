import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Mensaje } from "../interfaces/mensaje.interface";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];
  public usuario: any = {};
  public cargados:number = 0;

  constructor(private afs: AngularFirestore){}

  cargarMensajes(){
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref=> ref.orderBy('fecha', 'desc').limit(10));
    this.cargados = 10;
    return this.itemsCollection.valueChanges().pipe(map((mensajes: Mensaje[] )=>{
      this.chats = [];
      for(let mensaje of mensajes){
        this.chats.unshift(mensaje);
      }
    }));
  }

  cargarMasMensajes(){
    this.cargados +=10;
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref=> ref.orderBy('fecha', 'desc').limit(this.cargados));
    return this.itemsCollection.valueChanges().pipe(map((mensajes: Mensaje[] )=>{
      this.chats = [];
      for(let mensaje of mensajes){
        this.chats.unshift(mensaje);
      }
    }));
  }

  agregarMensaje(texto:string, usuario:string, uid:string){
    let mensaje: Mensaje = {
      nombre: usuario,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: uid
    }
    return this.itemsCollection.add(mensaje);
  }

}
