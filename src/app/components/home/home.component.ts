import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import * as FileSaver from "file-saver";

import { Storage, ref, getDownloadURL } from "@angular/fire/storage";
import { inject } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  cvImageUrl: string;
  cvURL: string;
  year: string;
  private storage = inject(Storage); // ✅ inject storage

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // const storage = getStorage(); // Initialize Firebase storage

    // Fetch the CV image URL
    const imageRef = ref(this.storage, "CV/jrp-cv.jpg");
    getDownloadURL(imageRef).then((downloadURL) => {
      this.cvImageUrl = downloadURL;
    });

    // Fetch the CV PDF URL
    const pdfRef = ref(this.storage, "CV/jrpCV.pdf");
    getDownloadURL(pdfRef).then((downloadURL) => {
      this.cvURL = downloadURL;
    });
    this.year = new Date().getFullYear().toString();
    console.log("HomeComponent loaded");
  }

  downloadPDF(): any {
    return this.http.get(this.cvURL, { responseType: "blob" }).pipe(
      map((res) => {
        return new Blob([res], { type: "application/pdf" });
      })
    );
  }

  downloadAndOpenPDF() {
    this.downloadPDF().subscribe((res) => {
      FileSaver.saveAs(res, "Javier Ródenas Pérez CV.pdf");
      //To open file too
      //var fileURL = URL.createObjectURL(res);
      //window.open(fileURL);
    });
  }
}
