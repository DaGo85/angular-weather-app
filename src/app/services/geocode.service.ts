import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeocodeService {
  constructor(private http: HttpClient) {}

  getCurrentWeather(loc: string) {
    return this.http.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=${5}&appid=${
        environment.API_KEY
      }`
    );
  }
}
