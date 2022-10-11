import { Component, OnInit } from '@angular/core';
import { GeocodeService } from 'src/app/services/geocode.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  geoInput: string = '';
  locationsArray: { name: string; country: string; state: string }[] = [];

  constructor(private geocodeService: GeocodeService) {}

  ngOnInit(): void {}

  getGeoCode() {
    if (this.geoInput.length <= 3) return;

    this.geocodeService.getGeoCode(this.geoInput).subscribe((res) => {
      this.locationsArray = res;
      console.log(res);
    });
  }
}
