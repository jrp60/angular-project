import { Component, OnInit } from "@angular/core";
import { HuggingfaceService } from "../../../services/huggingface.service";

@Component({
  selector: "app-image-generator",
  template: `<div>Image Generator Works!</div>`, // ✅ inline HTML
  styles: [], // ✅ empty or inline styles
})
export class ImageGeneratorComponent {
  imageUrl: string | ArrayBuffer | null = null;
  private loading: boolean = false;
  constructor(private huggingFaceService: HuggingfaceService) {}

  // async generate() {
  //   try {
  //     const imageBlob = await this.huggingFaceService.generateImage(
  //       "A futuristic city at night"
  //     );
  //     const reader = new FileReader();
  //     reader.onloadend = () => (this.imageUrl = reader.result);
  //     reader.readAsDataURL(imageBlob);
  //   } catch (error) {
  //     console.error("Error generating image:", error);
  //   }
  // } A futuristic city at night in chaos and neon

  generate() {
    this.loading = true;
    this.huggingFaceService
      .generateImage(
        "A shark dancing under the moon with a ak 47 in fire in his hands"
      )
      .subscribe((response) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.imageUrl = reader.result;
          this.loading = false;
        };
        reader.readAsDataURL(response);
      });
  }

  get isLoading(): boolean {
    return this.loading;
  }
}
