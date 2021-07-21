import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
//import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms'

@Component({
  selector: 'app-login-firebase',
  templateUrl: './login-firebase.component.html',
  styleUrls: ['./login-firebase.component.css']
})
export class LoginFirebaseComponent implements OnInit {
  errorMessage = '';
  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private fb: FormBuilder,
    private ngZone: NgZone){ }
 
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })
 
  ngOnInit() {
    this.afAuth.user.subscribe(user => {
      if (user) {
        this.ngZone.run(() => {
          this.router.navigate(['/fotos/subir-imagen']);
        })
      }
    })
  }
 
  createUser() {
   this.afAuth.createUserWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password).then(() => {
      this.router.navigate(['/fotos/subir-imagen']);
    }).catch(response => {
      this.errorMessage = response.message;
    });
  }
 
  signIn() { 
   this.afAuth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password).then(() => {
      this.router.navigate(['/fotos/subir-imagen']);
    }).catch(response => {
      this.errorMessage = response.message;
    });
  }

}
