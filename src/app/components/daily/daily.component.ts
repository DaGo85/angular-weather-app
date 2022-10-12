import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss'],
})
export class DailyComponent implements OnInit {
  dailyArray: {
    temp: { day: string; night: string };
    humidity: string;
    rain?: string;
    snow?: string;
    weather: { icon: string; description: string }[];
  }[] = [];
  dayTime: string[] = [];

  constructor(private weatherService: WeatherService) {}

  getFormatedDate(dateUnix: number, index: number) {
    return new Date(dateUnix * 1000 + index * 86400000).toLocaleDateString(
      undefined,
      {
        day: '2-digit',
        month: 'long',
      }
    );
  }

  ngOnInit(): void {
    this.weatherService.subscribeWeather().subscribe((response: any) => {
      if (response === null) return;
      this.dailyArray = response.daily;
      for (let i = 0; i < 8; i++) {
        this.dayTime.push(this.getFormatedDate(response.current.dt, i));
      }
    });
  }
}
