import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeocodeService {
  constructor(private http: HttpClient) {}

  getGeoCode(location: string): Observable<any> {
    return this.http.get<any>(
      `https://pro.openweathermap.org/geo/1.0/direct?q=${location}&limit=${5}&appid=${
        environment.API_KEY
      }`
    );
  }
}
