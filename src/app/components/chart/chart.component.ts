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
    1666872879, 1666872890, 1666872891, 1666872892, 1666872893, 1666872894,
    1666872895, 1666872896, 1666872897,
  ];

  temps: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  public fullData: { date: number; value: number }[] = [];

  margin = { top: 40, right: 48, bottom: 40, left: 40 };
  width: number = 600;
  height: number = 620 - this.margin.top - this.margin.bottom;
  viewBoxWidth = this.width + this.margin.left + this.margin.right;
  viewBoxHeight = this.height + this.margin.top + this.margin.bottom;

  draw() {
    console.log(this.fullData);
    let svg = d3
      .select('#my_dataviz')
      .attr('viewBox', [0, 0, this.viewBoxWidth, this.viewBoxHeight])
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    // x axis
    // @ts-ignore
    let x = d3.scaleTime().domain(d3.extent(this.dates)).range([0, this.width]);

    const xaxis = d3.axisBottom(x).tickFormat(d3.format('0'));
    //.scale(x);

    svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(xaxis);

    //y axis

    let y = d3
      .scaleLinear()
      // @ts-ignore
      .domain([d3.min(this.temps) - 2, d3.max(this.temps) + 2])
      .range([this.height, 0]);

    svg.append('g').call(d3.axisLeft(y));

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

    let line = svg
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
      .datum(this.fullData)
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
    const circles = svg
      .append('g')
      .selectAll('circle')
      .data(this.fullData)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(d.date))
      .attr('cy', (d) => y(d.value))
      .attr('r', 5)
      .attr('class', 'dot');
  }

  constructor() {}

  public ngOnInit(): void {
    this.dates.map((date, i) => {
      this.fullData.push({ date: date, value: this.temps[i] });
    });
    this.draw();
  }
}
