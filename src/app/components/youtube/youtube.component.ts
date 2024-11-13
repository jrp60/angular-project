import { Component, ElementRef, ViewChild } from "@angular/core";
//import { $ } from "protractor";
import { YoutubeService } from "../../services/youtube.service";

@Component({
  selector: "app-youtube",
  templateUrl: "./youtube.component.html",
  styles: [],
})
export class YoutubeComponent {
  videos: any[] = [];
  videoSel: any;
  alert: boolean = true;
  @ViewChild("alertModal", { static: true }) alertModal: ElementRef;

  constructor(public _yts: YoutubeService) {
    this._yts.getVideos().subscribe((videos) => {
      this.videos = videos;
    });
    this.alert = true;
    //$("#alertModal").modal("show");

    //this.openModal();
  }

  ngAfterViewInit() {
    this.openAlert();
  }
  verVideo(video: any) {
    this.videoSel = video;
  }

  cerrarModal() {
    this.videoSel = null;
  }

  openAlert() {
    this.alert = true;
  }
  cerrarAlert() {
    this.alert = false;
  }

  // openModal() {
  //   this.modal.nativeElement.classList.add("show");
  //   this.modal.nativeElement.setAttribute("aria-modal", "true");
  //   this.modal.nativeElement.setAttribute("tabindex", "-1");
  // }

  // closeModal() {
  //   this.modal.nativeElement.classList.remove("show");
  //   this.modal.nativeElement.removeAttribute("aria-modal");
  //   this.modal.nativeElement.removeAttribute("tabindex");
  // }

  cargarMas() {
    this._yts.getVideos().subscribe((videos) => {
      this.videos.push.apply(this.videos, videos);
    });
  }
}
