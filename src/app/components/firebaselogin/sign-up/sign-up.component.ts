import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from "../../../services/authfirebase.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html'
})

export class SignUpComponent implements OnInit {

  constructor(
    public authService: AuthFirebaseService
  ) { }

  ngOnInit() { }

}
