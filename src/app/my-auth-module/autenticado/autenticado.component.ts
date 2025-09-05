import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-autenticado',
  templateUrl: './autenticado.component.html',
  styles: [
  ]
})
export class AutenticadoComponent implements OnInit {

  constructor(public auth:AuthService) { }

  ngOnInit(): void {
  }

}
