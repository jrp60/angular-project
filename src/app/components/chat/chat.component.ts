import { Component, OnInit } from "@angular/core";
import { ChatService } from "../../services/chat.service";
import { AuthFirebaseService } from "../../services/authfirebase.service";

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

  constructor(
    public authService: AuthFirebaseService,
    public _cs: ChatService
  ) {
    this.isLogged = this.authService.isLoggedIn;
  }

  ngOnInit(): void {
    // this._cs.mensajes$.subscribe((mensajes) => {
    //   console.log("Desde el componente:", mensajes);
    // });

    // this._cs.getChats();
    console.log("probandooo");

    this._cs.escucharMensajes().subscribe((mensajes) => {
      console.log("MENSAJES DE ESCUCHAR MENSAJES: ", mensajes);
      
    });

    // this._cs.cargarMasMensajesManual().then(() => {
    //   setTimeout(() => {
    //     this.elemento = document.getElementById("app-mensajes");
    //     if (this.elemento != null) {
    //       this.elemento.scrollTop = this.elemento.scrollHeight;
    //     }
    //   }, 20);
    // });

    this._cs.cargarTest().subscribe((res) => {
      console.log("Resultado de cargarTest:", res);
    });

    this._cs.cargarTest2().subscribe((res) => {
      console.log("🔥 Mensajes desde cargarTest2():", res);
    });

    // this._cs.cargarMasMensajes().subscribe((mensajes) => {
    //   setTimeout(() => {
    //     this.elemento = document.getElementById("app-mensajes");
    //     if (this.elemento != null) {
    //       this.elemento.scrollTop = this.elemento.scrollHeight;
    //     }
    //   }, 20);
    // });

    let userAux = JSON.parse(localStorage.getItem("user"));
    if (userAux != null) {
      this.usuario.nombre = userAux.displayName;
      this.usuario.id = userAux.uid;
      this.usuario.fotoUrl = userAux.photoURL;
      this.usuario.email = userAux.email;
      this.usuario.isVerified = userAux.emailVerified;
    }
  }

  cargarMasMensajes() {
    this._cs.cargarMasMensajes();
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
}
