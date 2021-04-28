import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutenticadoComponent } from './components/autenticado/autenticado.component';
import { ChatComponent } from './components/chat/chat.component';
import { GestorArchivosComponent } from './components/gestor-archivos/gestor-archivos.component';
import { HomeComponent } from './components/home/home.component';
import { MapsComponent } from './components/maps/maps.component';
import { SpotiComponent } from './components/spoti/spoti.component';
import { YoutubeComponent } from './components/youtube/youtube.component';

import { AuthGuard } from '@auth0/auth0-angular';

export const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'perfil', component: AutenticadoComponent, canActivate: [AuthGuard], },
  { path: 'chat', component: ChatComponent },
  { path: 'spoti', component: SpotiComponent },
  { path: 'youtube', component: YoutubeComponent },
  { path: 'maps', component: MapsComponent },
  { path: 'archivos', component: GestorArchivosComponent },
  /* { path: 'heroe/:id', component: personalAccount }, */
  { path: '**', pathMatch: 'full', redirectTo: 'HomeComponent' }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})

export class AppRoutingModule {
  constructor(){}
}
