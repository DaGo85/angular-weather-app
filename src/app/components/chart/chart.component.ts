import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  public title = 'Line Chart';

  hourly: any[] = [
    { date: 1666872879, value: 1 },
    { date: 1666872890, value: 2 },
    { date: 1666872891, value: 3 },
    { date: 1666872892, value: 4 },
    { date: 1666872893, value: 5 },
    { date: 1666872894, value: 6 },
    { date: 1666872895, value: 7 },
    { date: 1666872896, value: 8 },
    { date: 1666872897, value: 9 },
    { date: 1666872898, value: 10 },
  ];

  dates: any[] = [
    1666872879, 1666872890, 1666872891, 1666872892, 1666872893, 1666872894,
    1666872895, 1666872896, 1666872897, 1666872898,
  ];

  temps: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  margin = { top: 40, right: 48, bottom: 40, left: 40 };
  width: number = 800 - this.margin.left - this.margin.right;
  height: number = 620 - this.margin.top - this.margin.bottom;
  viewBoxWidth = this.width + this.margin.left + this.margin.right;
  viewBoxHeight = this.height + this.margin.top + this.margin.bottom;

  draw() {
    console.log(this.hourly);
    let svg = d3
      .select('#my_dataviz')
      .attr('viewBox', [0, 0, this.viewBoxWidth, this.viewBoxHeight])
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    // x axis
    let x = d3
      .scaleLinear()
      .domain([d3.min(this.dates) - 2, d3.max(this.dates) + 2])
      .range([0, this.width]);

    svg
      .append('g')
      .attr('transform', `translate(0, ${this.width})`)
      .call(d3.axisBottom(x));

    //y axis

    let y = d3
      .scaleLinear()
      .domain([d3.min(this.temps) - 2, d3.max(this.temps) + 2])
      .range([this.height, 0]);

    svg
      .append('g')
      .attr('transform', `translate(${this.height},0)`)
      .call(d3.axisLeft(y));

    // Graph Label
    svg
      .append('text')
      .style('font', '30px times')
      .attr('class', 'label-title')
      .attr('x', this.width / 2)
      .attr('y', -this.margin.top / 8)
      .attr('text-anchor', 'middle')
      .text('Temp. for the next 48 hours');

    //  X axis label
    svg
      .append('text')
      .style('font', '22px times')
      .attr('class', 'label')
      .attr('x', this.width)
      .attr('y', this.height + this.margin.bottom)
      .attr('text-anchor', 'middle')
      .text('Time');

    //  Y axis label
    svg
      .append('text')
      .style('font', '22px times')
      .attr('class', 'label')
      .attr('x', 0 - this.margin.left)
      .attr('y', 0 - this.margin.top / 2)
      .text('Temp. in °C');

    svg
      .append('path')
      .datum(this.temps)
      .attr('class', 'line')
      .attr(
        'd',
        // @ts-ignore
        d3
          .line() // @ts-ignore
          .x((d) => x(d.date)) // @ts-ignore
          .y((d) => y(d.value))
      );

    // @ts-ignore
    svg
      .append('path')
      .datum(this.hourly)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr(
        'd',
        // @ts-ignore
        d3
          .line() // @ts-ignore
          .x((d) => x(d.date)) // @ts-ignore
          .y((d) => y(d.value))
      );

    // Create Dots
    svg
      .append('g')
      .selectAll('circle')
      .data(this.hourly)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(d.date))
      .attr('cy', (d) => y(d.value))
      .attr('r', 5)
      .attr('class', 'dot');
  }

  constructor() {}

  public ngOnInit(): void {
    this.draw();
  }
}
