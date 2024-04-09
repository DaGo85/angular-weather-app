import { Component, OnInit } from '@angular/core';
import { WeatherService } from './../../services/weather.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  public title = 'Line Chart';

  hourly: any[] = [];
  dates: any[] = [];
  temps: any[] = [];

  margin = { top: 40, right: 48, bottom: 40, left: 40 };
  width: number = 800 - this.margin.left - this.margin.right;
  height: number = 620 - this.margin.top - this.margin.bottom;
  viewBoxWidth = this.width + this.margin.left + this.margin.right;
  viewBoxHeight = this.height + this.margin.top + this.margin.bottom;

  draw() {
    d3.selectAll('g > *').remove();
    let svg = d3
      .select('#d3-chart')
      .attr('viewBox', [0, 0, this.viewBoxWidth, this.viewBoxHeight])
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    // x axis
    let x = d3
      .scaleTime()
      .domain(
        //@ts-ignore
        d3.extent(this.dates)
      )
      .range([0, this.width]);

    svg
      .append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .call(d3.axisBottom(x));

    //y axis

    let y = d3
      .scaleLinear()
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

    // Create line
    svg
      .append('path')
      .datum(this.hourly)
      .attr('class', 'line')
      .attr(
        'd',
        d3
          .line() //@ts-ignore
          .x((d) => x(d.dt * 1000)) //@ts-ignore
          .y((d) => y(d.temp))
      );

    // Create Dots
    let circles = svg
      .append('g')
      .selectAll('circle')
      .data(this.hourly)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(d.dt * 1000))
      .attr('cy', (d) => y(d.temp))
      .attr('r', 5)
      .attr('class', 'dot');

    // Tooltip data on mouseover
    function onMouseOver(event: any, d: any) {
      const [x, y] = d3.pointer(event);

      d3.select('body')
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 1)
        .html(
          `<img
              src=${`http://openweathermap.org/img/wn/${d.weather[0].icon}.png`}
              alt=${d.weather[0].description}
              width="40"
              height="40"
             /> ${d.weather[0].main}, <br/> Temperature: ${
            d.temp
          }°C<br/>Feels like: ${d.feels_like}°C<br/>Humidity: ${
            d.humidity
          }%<br/> ${new Date(d.dt * 1000).toLocaleDateString('default', {
            day: 'numeric',
            month: 'short',
          })}, ${new Date(d.dt * 1000).toLocaleTimeString('default', {
            hour: 'numeric',
            minute: 'numeric',
          })}`
        );
    }

    //Tooltip trigger
    let onMouseMove = (event: any, d: any) => {
      const [x, y] = d3.pointer(event);
      const isTooLow = y > this.height * 0.66;
      const isTooRight = x > this.width * 0.9;
    };

    //Tooltip remove
    function onMouseOut() {
      d3.select('.tooltip').style('opacity', 0).remove();
    }

    circles
      .on('mouseover', onMouseOver)
      .on('mouseout', onMouseOut)
      .on('mousemove', onMouseMove);
  }

  constructor(private weatherService: WeatherService) {}

  public ngOnInit(): void {
    this.weatherService.subscribeWeather().subscribe((response: any) => {
      if (response === null) return;
      this.hourly = response.hourly;
      this.dates = response.hourly.map((h: any) => {
        return h.dt * 1000;
      });
      this.temps = response.hourly.map((h: any) => {
        return h.temp;
      });

      this.draw();
    });
  }
}
