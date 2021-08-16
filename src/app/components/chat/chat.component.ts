import { Component, OnInit  } from '@angular/core';
import { ChatService } from "../../services/chat.service";
import { AuthFirebaseService } from "../../services/authfirebase.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit {

  mensaje:string = "";
  elemento:any;
  isLogged:boolean;
  usuario: any = {};

  constructor( public authService: AuthFirebaseService, public _cs:ChatService){
    this.isLogged = this.authService.isLoggedIn;
    console.log("Is logged: ", this.isLogged);
  }

  ngOnInit(): void {
    this._cs.cargarMensajes().subscribe( ()=>{
      //to set the scroll bar down when charge or new message
      setTimeout( ()=>{
        this.elemento = document.getElementById('app-mensajes');
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 20);
    });

    let userAux = JSON.parse(localStorage.getItem('user'));
    this.usuario.nombre = userAux.displayName;
    this.usuario.id = userAux.uid;
    this.usuario.fotoUrl = userAux.photoURL;
    this.usuario.email = userAux.email;
    this.usuario.isVerified = userAux.emailVerified;
    console.log("USUARIO after LOCALSTORAGE", this.usuario);
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
