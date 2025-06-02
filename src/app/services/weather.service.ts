import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { WeatherData } from '../models/weatherData.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  subject = new BehaviorSubject<any>(null);
  locationData = new BehaviorSubject<any>(null);
  store: WeatherData | {} = {} as WeatherData;

  constructor(private http: HttpClient) {}

  subscribeWeather(): Observable<any> {
    return this.subject.asObservable();
  }

  subscribeLocation(): Observable<any> {
    return this.locationData.asObservable();
  }

  setLocation(data: any) {
    this.locationData.next(data);
  }

  getWeather(lat: number, lon: number) {
    this.store = this.http
      .get(
        `https://pro.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${environment.API_KEY}&units=metric`
      )
      .subscribe((response) => this.subject.next(response));
  }
}
