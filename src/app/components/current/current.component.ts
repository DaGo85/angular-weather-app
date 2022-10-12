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

  constructor(private weatherService: WeatherService) {}

  currentWeather: WeatherData = this.weatherService.store as WeatherData;

  getFormatedDate(dateUnix: number) {
    return new Date(dateUnix * 1000).toString();
  }

  ngOnInit(): void {
    this.weatherService.subscribeWeather().subscribe((response: any) => {
      this.weatherData = response;
    });
    this.weatherService.getWeather(46.57, 7.27);
  }
}

/*
this.weatherService.getWeather(46.57, 7.27).subscribe((weather) => {
      this.currentWeather = {
        ...weather,
        current: {
          ...weather.current,
          temp: weather.current.temp.toFixed(),
          dt: this.getFormatedDate(weather.current.dt),
          sunrise: this.getFormatedDate(weather.current.sunrise),
          sunset: this.getFormatedDate(weather.current.sunset),
        },
      };
    });
*/
