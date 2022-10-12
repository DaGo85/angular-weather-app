import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
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
    new Date('2010-01-11'),
    new Date('2010-01-12'),
    new Date('2010-01-13'),
    new Date('2010-01-14'),
    new Date('2010-01-15'),
  ];
  temps: any[] = [10, 5, 2, 5, 10, 2, 12, 15, 12, 51, 12, 22, 12, 14, 15];

  private margin = { top: 40, right: 48, bottom: 40, left: 40 };
  private width: number;
  private height: number;
  private viewBoxWidth: number;
  private viewBoxHeight: number;
  private svg: any;
  private x: any;
  private y: any;
  private line: d3Shape.Line<[number, number]>;

  constructor() {
    this.width = 960 - this.margin.left - this.margin.right;
    this.height = 620 - this.margin.top - this.margin.bottom;
    this.viewBoxWidth = this.width + this.margin.left + this.margin.right;
    this.viewBoxHeight = this.height + this.margin.top + this.margin.bottom;
  }

  ngOnInit(): void {
    this.buildSvg();
    this.addXandYAxis();
    this.drawLineAndPath();
  }

  private buildSvg() {
    this.svg = d3
      .select('svg')
      .append('g')
      .attr(
        'transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')'
      );
  }

  private addXandYAxis() {
    // range of data configuring
    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.x.domain(d3Array.extent(this.data, (d) => d.date));
    this.y.domain(d3Array.extent(this.data, (d) => d.value));

    // Configure the Y Axis
    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));
    // Configure the Y Axis
    this.svg
      .append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y));
  }

  private drawLineAndPath() {
    this.line = d3Shape
      .line()
      .x((d: any) => this.x(d.date))
      .y((d: any) => this.y(d.value));
    // Configuring line path
    this.svg
      .append('path')
      .datum(this.data)
      .attr('class', 'line')
      .attr('d', this.line);
  }
}
