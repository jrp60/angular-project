import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styles: [
  ]
})
export class MapsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  lat = 51.678418;
  lng = 7.809007;
  zoom=20;

}
