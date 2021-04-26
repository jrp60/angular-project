import { RouterModule, Routes } from '@angular/router';
import { AutenticadoComponent } from './components/autenticado/autenticado.component';
import { HomeComponent } from './components/home/home.component';

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'perfil', component: AutenticadoComponent },
    { path: 'perfil', component: AutenticadoComponent },
    /* { path: 'heroe/:id', component: personalAccount }, */
    { path: '**', pathMatch: 'full', redirectTo: 'HomeComponent' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);