import { Component, OnInit } from "@angular/core";
import { ChatService } from "../../services/chat.service";
import { AuthFirebaseService } from "../../services/authfirebase.service";
import { Mensaje } from "../../interfaces/mensaje.interface";
import { map, Observable, of } from "rxjs";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styles: [],
})
export class ChatComponent implements OnInit {
  mensaje: string = "";
  elemento: any;
  isLogged: boolean;
  usuario: any = {};
  loadedMessages: Mensaje[] = [];
  chats$!: Observable<Mensaje[]>; // observable that subs and unsubs automatically with async pipe

  constructor(
    public authService: AuthFirebaseService,
    public _cs: ChatService
  ) {
    this.isLogged = this.authService.isLoggedIn;
  }

  ngOnInit(): void {
    this.chats$ = this._cs.listenMessages().pipe(
      map((messages) => {
        //map because we need secundary actions like to set the scroll bottom
        this.loadedMessages = messages; // save firts messages
        setTimeout(() => this.scrollToBottom(), 20);
        return this.loadedMessages;
      })
    );

    let userAux = JSON.parse(localStorage.getItem("user"));
    if (userAux != null) {
      this.usuario.nombre = userAux.displayName;
      this.usuario.id = userAux.uid;
      this.usuario.fotoUrl = userAux.photoURL;
      this.usuario.email = userAux.email;
      this.usuario.isVerified = userAux.emailVerified;
    }
  }

  async loadMore() {
    const el = document.getElementById("app-mensajes");
    const prevHeight = el?.scrollHeight ?? 0;

    const olders = await this._cs.loadMoreMessages();
    if (olders.length == 0) return;

    this.loadedMessages = [...olders, ...this.loadedMessages]; // concatenate new messages
    this.chats$ = of(this.loadedMessages); // update observable

    setTimeout(() => {
      if (!el) return;
      const newHeight = el.scrollHeight;
      el.scrollTop = newHeight - prevHeight; // keeps scroll in view
    }, 0);
  }

  enviar_mensaje() {
    if (this.mensaje.length === 0) {
      return;
    }

    this._cs
      .agregarMensaje(this.mensaje, this.usuario.nombre, this.usuario.id)
      .then(() => {
        this.mensaje = "";
      })
      .catch((err) => console.log("Error al enviar", err));
  }

  private scrollToBottom() {
    this.elemento = document.getElementById("app-mensajes");
    if (this.elemento) this.elemento.scrollTop = this.elemento.scrollHeight;
  }
}
