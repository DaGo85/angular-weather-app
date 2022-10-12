import { WeatherService } from './../../services/weather.service';
import { Component, OnInit } from '@angular/core';
import { WeatherData } from '../../models/weatherData.model';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss'],
})
export class CurrentComponent implements OnInit {
  weatherData: WeatherData | any = {};
  locationData: {} | any;

  constructor(private weatherService: WeatherService) {}

  getFormatedDate(dateUnix: number) {
    return new Date(dateUnix * 1000).toString();
  }

  ngOnInit(): void {
    this.weatherService.subscribeLocation().subscribe((response: any) => {
      this.locationData = response;
    });
    this.weatherService.subscribeWeather().subscribe((response: any) => {
      this.weatherData = {
        ...response,
        current: {
          ...response.current,
          temp: response.current.temp.toFixed(),
          dt: this.getFormatedDate(response.current.dt),
          sunrise: this.getFormatedDate(response.current.sunrise),
          sunset: this.getFormatedDate(response.current.sunset),
        },
      };
    });
    this.weatherService.getWeather(46.57, 7.27);
  }
}
