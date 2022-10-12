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
  store: WeatherData | {} = {} as WeatherData;

  constructor(private http: HttpClient) {}

  subscribeWeather(): Observable<any> {
    return this.subject.asObservable();
  }

  getWeather(lat: number, lon: number) {
    this.store = this.http
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${environment.API_KEY}&units=metric`
      )
      .subscribe((response) => this.subject.next(response));
  }
}

//this.getWeather(46.57, 7.27

//this.subject.next(this.store);

/*this.store = this.http.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${environment.API_KEY}&units=metric`
    );*/
