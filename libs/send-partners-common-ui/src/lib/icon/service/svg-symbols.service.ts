import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssetPath } from '../../enums';

@Injectable({
  providedIn: 'root',
})
export class SvgSymbolsService {
  constructor(http: HttpClient) {
    http.get(AssetPath['symbols.svg'], { responseType: 'text' }).subscribe(result => {
      const parsedResult = new DOMParser().parseFromString(result, 'text/xml');
      const svgElement = parsedResult.getElementsByTagName('svg')[0];

      // Don't interfere with display
      svgElement.style.display = 'none';

      const head = document.getElementsByTagName('head')[0];

      head.appendChild(svgElement);
    });
  }
}
