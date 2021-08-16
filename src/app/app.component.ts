import { Component } from '@angular/core';
import { AuthFirebaseService } from "./services/authfirebase.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'personalApp';
  constructor(public authService:AuthFirebaseService) {
    console.log("app component constructor with authservice");
    
  }
}
