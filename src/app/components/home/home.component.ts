import { Component, OnInit } from '@angular/core';
import 'firebase/storage';
import firebase from 'firebase/app';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cvImageUrl:string;
  cvURL:string;

  constructor(private http:HttpClient) {
    let fbStorage = firebase.storage();
    fbStorage.ref('CV/jrp-cv.jpg').getDownloadURL().then((downloadURL)=> {
      this.cvImageUrl = downloadURL;
    });
    fbStorage.ref('CV/jrpCV.pdf').getDownloadURL().then((downloadURL)=> {
      this.cvURL = downloadURL;
    });

  }

  ngOnInit() {
  }

  downloadPDF(): any {
    return this.http.get(this.cvURL, { responseType: 'blob'}).pipe(map((res) => {
      return new Blob([res], { type: 'application/pdf' });
    }));
  }

  downloadAndOpenPDF(){
    this.downloadPDF().subscribe(
      (res) => {
        FileSaver.saveAs(res, "Javier Ródenas Pérez CV.pdf"); 
        //To open file too
        //var fileURL = URL.createObjectURL(res);
        //window.open(fileURL); 
      }
    );
  }

}
