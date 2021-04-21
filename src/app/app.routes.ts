import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PersonalAccountComponent } from './components/personal-account/personal-account.component';

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'perfil', component: PersonalAccountComponent },
    /* { path: 'heroe/:id', component: personalAccount }, */
    { path: '**', pathMatch: 'full', redirectTo: 'HomeComponent' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);