import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { HfInference } from "@huggingface/inference";

@Injectable({
  providedIn: "root",
})
export class HuggingfaceService {
  private token = environment.HUGGINGFACE_API_TOKEN;
  private url =
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2";

  // private client: HfInference;
  private modelOne = "stabilityai/stable-diffusion-2";
  private modelTwo = "black-forest-labs/FLUX.1-dev";
  private modelThree = "Kwai-Kolors/Kolors";
  private modelFour = "stabilityai/stable-diffusion-3-medium-diffusers";

  constructor(private httpClient: HttpClient) {
    // this.client = new HfInference(this.token);
  }

  // async generateImage(prompt: string) {
  //   return await this.client.textToImage({
  //     model: this.modelOne,
  //     inputs: prompt,
  //     parameters: { num_inference_steps: 5 },
  //   });
  // }

  generateImage(prompt: string) {
    console.log("TOKEN CARGADO:", this.token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token.trim()}`,
      "Content-type": "application/json",
    });

    const body = { inputs: prompt };

    return this.httpClient.post(this.url, body, {
      headers,
      responseType: "blob",
    });
  }
}
