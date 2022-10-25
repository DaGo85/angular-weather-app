import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

interface Stock {
  date: Date;
  value: number;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  public title = 'Line Chart';
  dates: any[] = [
    new Date('2010-01-01'),
    new Date('2010-01-02'),
    new Date('2010-01-03'),
    new Date('2010-01-04'),
    new Date('2010-01-05'),
    new Date('2010-01-06'),
    new Date('2010-01-07'),
    new Date('2010-01-08'),
    new Date('2010-01-09'),
    new Date('2010-01-10'),
  ];

  temp: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  margin = { top: 40, right: 48, bottom: 40, left: 40 };
  width: number = 600;
  height: number = 620 - this.margin.top - this.margin.bottom;
  viewBoxWidth: number = this.width + this.margin.left + this.margin.right;
  viewBoxHeight: number = this.height + this.margin.top + this.margin.bottom;

  constructor() {}
  public ngOnInit(): void {}

  svg = d3
    .select('svg')
    .attr('viewBox', [0, 0, this.viewBoxWidth, this.viewBoxHeight])
    .append('g')
    .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

  // Create Axis
}
