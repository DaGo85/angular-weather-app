import { Component, OnInit } from '@angular/core';

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
  }[] = [
    {
      temp: { day: '20', night: '10' },
      humidity: '200',
      rain: '200',
    },
    {
      temp: { day: '20', night: '10' },
      humidity: '200',
      snow: '200',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
