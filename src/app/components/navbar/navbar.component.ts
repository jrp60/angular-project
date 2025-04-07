import { Component, OnInit } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import { Auth } from "@angular/fire/auth";

import { onAuthStateChanged } from "firebase/auth";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styles: [],
})
export class NavbarComponent implements OnInit {
  isLogged: boolean;

  constructor(public authS: AuthService, private auth: Auth) {}

  ngOnInit() {
    onAuthStateChanged(this.auth, (user) => {
      this.isLogged = !!user;
    });
  }
}
