import { Component, OnInit } from '@angular/core';
import 'firebase/storage';
import firebase from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cvImageUrl:string;
  cvURL:string;

  constructor() {
    let fbStorage = firebase.storage();
    fbStorage.ref('CV/jrp-cv.jpg').getDownloadURL().then((downloadURL)=> {
      this.cvImageUrl = downloadURL;
    });
    fbStorage.ref('CV/jrpCV.pdf').getDownloadURL().then((downloadURL)=> {
      this.cvURL = downloadURL;
    });

    fbStorage.ref('CV/jrpCV.pdf').getDownloadURL().then(function(url) {

      console.log("THIS LINE NEVER GETS PRINTED");
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function(event) {
          Blob = xhr.response;  
      };
      xhr.open('GET', url);
      xhr.send();

      }).then(function() {
          //some more code
      }).catch(function(error) {
          console.log(error);
      });

  }

  ngOnInit() {
  }

}
