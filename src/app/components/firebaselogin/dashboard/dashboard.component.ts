import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from "../../../services/authfirebase.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public authService: AuthFirebaseService) { }

  ngOnInit(): void {
  }

}
