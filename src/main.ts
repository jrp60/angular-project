import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}


window.GOOGLE_MAPS_API_KEY = environment.AGM_APIKEY;  // Pasamos apiKey desde environment.ts

//if map doesnt work, delete this and put script inside index.html
const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${window.GOOGLE_MAPS_API_KEY}`;
script.async = true;
script.defer = true;
document.head.appendChild(script);

script.src = `https://maps.googleapis.com/maps/api/js?key=${window.GOOGLE_MAPS_API_KEY}&callback=initMap`;
(window as any).initMap = () => {
  console.log("Google Maps script loaded");
};



platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
