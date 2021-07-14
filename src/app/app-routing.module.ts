import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@auth0/auth0-angular';

/* import { AppRoutingModule } from './app-routing.module'; */
import { HomeComponent } from './components/home/home.component';
import { AutenticadoComponent } from './components/autenticado/autenticado.component';
import { ChatComponent } from './components/chat/chat.component';
import { SpotiComponent } from './components/spoti/spoti.component';
import { YoutubeComponent } from './components/youtube/youtube.component';
import { MapsComponent } from './components/maps/maps.component';
import { GestorArchivosComponent } from './components/gestor-archivos/gestor-archivos.component';
import { SearchComponent } from './components/spoti/search/search.component';
import { ArtistComponent } from './components/spoti/artist/artist.component';
import { FotosComponent } from './components/gestor-archivos/fotos/fotos.component';

export const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'perfil', component: AutenticadoComponent, canActivate: [AuthGuard], },
  { path: 'chat', component: ChatComponent },
  { path: 'spotify', component: SpotiComponent },
  { path: 'spotify/search', component: SearchComponent },
  { path: 'spotify/search/:id', component: ArtistComponent },
  { path: 'youtube', component: YoutubeComponent },
  { path: 'maps', component: MapsComponent },
  { path: 'fotos/subir-imagen', component: GestorArchivosComponent },
  { path: 'fotos', component: FotosComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

/* @NgModule({ 
  declarations: [
    MapsComponent,
  ],
  imports: [
    RouterModule.forRoot(APP_ROUTES),
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyDThwGxJqFsSN-etU1MGnLsXBc66dIRYsU'
      }),
    ],
  exports: [RouterModule],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ]
}) */

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})

export class AppRoutingModule {
  constructor(){}
}

