//Angular
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthModule } from "@auth0/auth0-angular";
import { HttpClientModule } from "@angular/common/http";
import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { provideAuth, getAuth } from "@angular/fire/auth";
import { provideFirestore, getFirestore } from "@angular/fire/firestore";
import { provideDatabase, getDatabase } from "@angular/fire/database";
import { provideStorage, getStorage } from "@angular/fire/storage";
import { CommonModule } from "@angular/common";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { GoogleMapsModule } from "@angular/google-maps";

//Services
import { MapasService } from "./services/mapas.service";
import { SpotifyService } from "./services/spotify.service";
import { YoutubeService } from "./services/youtube.service";
import { CargaImagenesService } from "./services/carga-imagenes.service";
import { AuthFirebaseService } from "./services/authfirebase.service";
import { ChatService } from "./services/chat.service";

//Components
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
import { TestsComponent } from "./components/tests/tests.component";
import { PollComponent } from "./components/tests/poll/poll.component";
import { ImageGeneratorComponent } from "./components/tests/image-generator/image-generator.component";
import { WipBannerComponent } from "./components/shared/wip-banner/wip-banner.component";
import { NgrxSimulatorComponent } from "./components/tests/ngrx-simulator/ngrx-simulator.component";

//Pipes & Directives
import { SinfotoPipe } from "./pipes/sinfoto.pipe";
import { DomseguroPipe } from "./pipes/domseguro.pipe";
import { VideoYoutubePipe } from "./pipes/video-youtube.pipe";
import { NgDropFilesDirective } from "./directives/ng-drop-files.directive";

//Material
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { MatProgressBarModule } from "@angular/material/progress-bar";

//Store
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { simulationReducer } from "./state/ngrx-sim/ngrx-sim.reducer";
import { SimEffects } from "./state/ngrx-sim/ngrx-sim.effects";

import { environment } from "../environments/environment";

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
    TestsComponent,
    PollComponent,
    ImageGeneratorComponent,
    WipBannerComponent,
    NgrxSimulatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({
      domain: environment.AUTH_DOMAIN,
      clientId: environment.AUTH_CLIENT_ID,
    }),
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    DragDropModule,
    GoogleMapsModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    StoreModule.forRoot({
      simulation: simulationReducer,
    }),
    EffectsModule.forRoot([SimEffects]),
  ],
  providers: [
    MapasService,
    SpotifyService,
    YoutubeService,
    CargaImagenesService,
    AuthFirebaseService,
    ChatService,
    provideFirebaseApp(() => initializeApp(environment.FIREBASE)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage()),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
