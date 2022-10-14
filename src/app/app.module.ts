import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthModule } from "@auth0/auth0-angular";
import { HttpClientModule } from "@angular/common/http";
import { AgmCoreModule } from "@agm/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { CommonModule } from "@angular/common";

import { MapasService } from "./services/mapas.service";
import { SpotifyService } from "./services/spotify.service";
import { YoutubeService } from "./services/youtube.service";
import { CargaImagenesService } from "./services/carga-imagenes.service";
import { AuthFirebaseService } from "./services/authfirebase.service";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HomeComponent } from "./components/home/home.component";
import { AuthButtonComponent } from "./components/auth-button/auth-button.component";
import { AutenticadoComponent } from "./components/autenticado/autenticado.component";
import { ChatComponent } from "./components/chat/chat.component";
import { SpotiComponent } from "./components/spoti/spoti.component";
import { YoutubeComponent } from "./components/youtube/youtube.component";
import { MapsComponent } from "./components/maps/maps.component";
import { GestorArchivosComponent } from "./components/gestor-archivos/gestor-archivos.component";
import { SearchComponent } from "./components/spoti/search/search.component";
import { ArtistComponent } from "./components/spoti/artist/artist.component";
import { DashboardComponent } from "./components/firebaselogin/dashboard/dashboard.component";
import { SignInComponent } from "./components/firebaselogin/sign-in/sign-in.component";
import { SignUpComponent } from "./components/firebaselogin/sign-up/sign-up.component";
import { ForgotPasswordComponent } from "./components/firebaselogin/forgot-password/forgot-password.component";
import { VerifyEmailComponent } from "./components/firebaselogin/verify-email/verify-email.component";
import { FotosComponent } from "./components/gestor-archivos/fotos/fotos.component";

import { SinfotoPipe } from "./pipes/sinfoto.pipe";
import { DomseguroPipe } from "./pipes/domseguro.pipe";
import { VideoYoutubePipe } from "./pipes/video-youtube.pipe";

import { NgDropFilesDirective } from "./directives/ng-drop-files.directive";

import { environment } from "../environments/environment";
import firebase from "firebase/app";
import "firebase/storage";
//firebase.initializeApp(environment.FIREBASE);
firebase.initializeApp(environment.FIREBASE);
export const storage = firebase.storage();

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AuthButtonComponent,
    AutenticadoComponent,
    ChatComponent,
    SpotiComponent,
    YoutubeComponent,
    MapsComponent,
    GestorArchivosComponent,
    SearchComponent,
    SinfotoPipe,
    DomseguroPipe,
    ArtistComponent,
    VideoYoutubePipe,
    FotosComponent,
    NgDropFilesDirective,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.FIREBASE),
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({
      domain: environment.AUTH_DOMAIN,
      clientId: environment.AUTH_CLIENT_ID,
    }),
    HttpClientModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.AGM_APIKEY,
    }),
    AngularFireDatabaseModule,
    CommonModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
  ],
  providers: [
    MapasService,
    SpotifyService,
    YoutubeService,
    CargaImagenesService,
    AuthFirebaseService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
