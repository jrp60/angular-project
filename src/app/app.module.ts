import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthModule } from '@auth0/auth0-angular';
import { HttpClientModule } from '@angular/common/http';

import { AgmCoreModule } from '@agm/core';

import { MapasService } from "./services/mapas.service";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';
import { AutenticadoComponent } from './components/autenticado/autenticado.component';
import { ChatComponent } from './components/chat/chat.component';
import { SpotiComponent } from './components/spoti/spoti.component';
import { YoutubeComponent } from './components/youtube/youtube.component';
import { MapsComponent } from './components/maps/maps.component';
import { GestorArchivosComponent } from './components/gestor-archivos/gestor-archivos.component';
import { SearchComponent } from './components/spoti/search/search.component';
import { ArtistComponent } from './components/spoti/artist/artist.component';

import { SinfotoPipe } from './pipes/sinfoto.pipe';
import { DomseguroPipe } from './pipes/domseguro.pipe';

import { environment } from '../environments/environment';

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
    ArtistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({
      domain: environment.AUTH_DOMAIN,
      clientId:  environment.AUTH_CLIENT_ID
    }),
    HttpClientModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.AGM_APIKEY
    })
    
  ],
  providers: [MapasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
