// src/app/auth/auth.module.ts
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

// Components
import { AutenticadoComponent } from "./autenticado/autenticado.component";
import { DashboardComponent } from "./firebaselogin/dashboard/dashboard.component";
import { SignInComponent } from "./firebaselogin/sign-in/sign-in.component";
import { SignUpComponent } from "./firebaselogin/sign-up/sign-up.component";
import { ForgotPasswordComponent } from "./firebaselogin/forgot-password/forgot-password.component";
import { VerifyEmailComponent } from "./firebaselogin/verify-email/verify-email.component";

// Services
import { AuthFirebaseService } from "./services/authfirebase.service";

// Guards
import { AuthFirebaseGuard } from "./guard/auth-firebase.guard";
import { LoginFirebaseGuard } from "./guard/login-firebase.guard";

@NgModule({
  declarations: [
    AutenticadoComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  providers: [
    AuthFirebaseService, // opcional si ya tiene providedIn: 'root'
    AuthFirebaseGuard, // opcional si ya tiene providedIn: 'root'
    LoginFirebaseGuard, // opcional si ya tiene providedIn: 'root'
  ],
  exports: [
    AutenticadoComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
  ],
})
export class MyAuthModule {}
