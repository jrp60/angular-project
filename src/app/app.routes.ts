/* import { RouterModule, Routes } from '@angular/router';
import { AutenticadoComponent } from './components/autenticado/autenticado.component';
import { ChatComponent } from './components/chat/chat.component';
import { GestorArchivosComponent } from './components/gestor-archivos/gestor-archivos.component';
import { HomeComponent } from './components/home/home.component';
import { MapsComponent } from './components/maps/maps.component';
import { SpotiComponent } from './components/spoti/spoti.component';
import { YoutubeComponent } from './components/youtube/youtube.component';

import { AuthGuard } from '@auth0/auth0-angular';

const APP_ROUTES2: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'perfil', component: AutenticadoComponent, canActivate: [AuthGuard], },
    { path: 'chat', component: ChatComponent },
    { path: 'spoti', component: SpotiComponent },
    { path: 'youtube', component: YoutubeComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'archivos', component: GestorArchivosComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'HomeComponent' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES2);
 */