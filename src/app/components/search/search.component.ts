import { Component, OnInit } from '@angular/core';
import { GeocodeService } from 'src/app/services/geocode.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  geoInput: string = '';
  locationsArray: {
    name: string;
    country: string;
    state: string;
    lat: number;
    lon: number;
  }[] = [];

  constructor(
    private geocodeService: GeocodeService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {}

  getWeatherNow(lat: number, lon: number) {
    this.weatherService.getWeather(lat, lon);
  }

  getGeoCode() {
    if (this.geoInput.length <= 3) return;

    this.geocodeService.getGeoCode(this.geoInput).subscribe((res) => {
      this.locationsArray = res;
      console.log(res);
    });
  }
}
