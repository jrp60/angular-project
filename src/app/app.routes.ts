import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    /* { path: 'heroe/:id', component: HeroeComponent } */,
    { path: '**', pathMatch: 'full', redirectTo: 'HomeComponent' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);