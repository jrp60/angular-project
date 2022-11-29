import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "@auth0/auth0-angular";
import { AuthFirebaseGuard } from "./guard/auth-firebase.guard";
import { LoginFirebaseGuard } from "./guard/login-firebase.guard";

/* import { AppRoutingModule } from './app-routing.module'; */
import { HomeComponent } from "./components/home/home.component";
import { AutenticadoComponent } from "./components/autenticado/autenticado.component";
import { ChatComponent } from "./components/chat/chat.component";
import { SpotiComponent } from "./components/spoti/spoti.component";
import { YoutubeComponent } from "./components/youtube/youtube.component";
import { MapsComponent } from "./components/maps/maps.component";
import { GestorArchivosComponent } from "./components/gestor-archivos/gestor-archivos.component";
import { SearchComponent } from "./components/spoti/search/search.component";
import { ArtistComponent } from "./components/spoti/artist/artist.component";
import { FotosComponent } from "./components/gestor-archivos/fotos/fotos.component";
import { SignInComponent } from "./components/firebaselogin/sign-in/sign-in.component";
import { SignUpComponent } from "./components/firebaselogin/sign-up/sign-up.component";
import { DashboardComponent } from "./components/firebaselogin/dashboard/dashboard.component";
import { ForgotPasswordComponent } from "./components/firebaselogin/forgot-password/forgot-password.component";
import { VerifyEmailComponent } from "./components/firebaselogin/verify-email/verify-email.component";

export const APP_ROUTES: Routes = [
  {
    path: "https://jrp60.github.io/angular-project/home",
    component: HomeComponent,
  },
  {
    path: "jrp60.github.io/angular-project/home",
    component: HomeComponent,
  },
  {
    path: "home",
    component: HomeComponent,
  },
  { path: "perfil", component: AutenticadoComponent, canActivate: [AuthGuard] },
  {
    path: "sign-in",
    component: SignInComponent,
    canActivate: [LoginFirebaseGuard],
  },
  { path: "register-user", component: SignUpComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthFirebaseGuard],
  },
  { path: "forgot-password", component: ForgotPasswordComponent },
  { path: "verify-email", component: VerifyEmailComponent },
  { path: "chat", component: ChatComponent },
  { path: "spotify", component: SpotiComponent },
  { path: "spotify/search", component: SearchComponent },
  { path: "spotify/search/:id", component: ArtistComponent },
  { path: "youtube", component: YoutubeComponent },
  { path: "maps", component: MapsComponent },
  { path: "fotos/subir-imagen", component: GestorArchivosComponent },
  { path: "fotos", component: FotosComponent },
  { path: "**", pathMatch: "full", redirectTo: "home" },
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
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor() {}
}
