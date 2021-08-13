import { Component, OnInit } from '@angular/core';
import { ChatService } from "../../services/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit {

  mensaje:string = "";

  constructor(public _cs:ChatService){
    this._cs.cargarMensajes().subscribe();
  }

  ngOnInit(): void {
  }

  enviar_mensaje(){
    console.log(this.mensaje);
    if(this.mensaje.length === 0){
      return;
    }

    this._cs.agregarMensaje(this.mensaje)
        .then( ()=>{ 
          console.log('Mensaje enviado'); 
          this.mensaje = "";
        })
        .catch( (err)=> console.log('Error al enviar', err) );
  }

}
