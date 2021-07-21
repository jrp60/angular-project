import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from "../../../services/authfirebase.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(public authService: AuthFirebaseService) { }

  ngOnInit(): void {
  }

}
