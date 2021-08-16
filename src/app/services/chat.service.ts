import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, reduce } from 'rxjs/operators';
import { Mensaje } from "../interfaces/mensaje.interface";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];
  public usuario: any = {};

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth){
    //afAuth
  }

  cargarMensajes(){
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref=> ref.orderBy('fecha', 'desc').limit(5));
    return this.itemsCollection.valueChanges().pipe(map((mensajes: Mensaje[] )=>{
      console.log(mensajes);
      this.chats = [];
      for(let mensaje of mensajes){
        this.chats.unshift(mensaje);
      }
      //this.chats = mensajes;
    }));
  }

  agregarMensaje(texto:string){

    // TODO falta el UID del usuario
    let mensaje: Mensaje = {
      nombre:'Demo',
      mensaje: texto,
      fecha: new Date().getTime()
    }

    return this.itemsCollection.add(mensaje);
  }

}
