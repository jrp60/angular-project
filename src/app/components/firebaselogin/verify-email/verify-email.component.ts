import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from "../../../services/authfirebase.service";

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html'
})
export class VerifyEmailComponent implements OnInit {

  constructor(
    public authService: AuthFirebaseService
  ) { }

  ngOnInit() {
  }

}