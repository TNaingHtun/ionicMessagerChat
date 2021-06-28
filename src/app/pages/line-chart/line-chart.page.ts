import { Component, ViewChild } from '@angular/core';
import { ɵDOMTestComponentRenderer } from '@angular/platform-browser-dynamic/testing';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: 'line-chart.page.html',
  styleUrls: ['line-chart.page.scss'],
})
export class LineChartPage {
  @ViewChild('lineChart') lineChart;

  bars: any;
  colorArray: any;
  constructor() { }

  ionViewDidEnter() {
    this.createBarChart();
  }

  createBarChart() {
    this.bars = new Chart(this.lineChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['', '', '', '', '', '', '', '','','','',],
        datasets: [{
          label: 'Viewers in millions',
          data: [0, 5, 4.5, 0, 5, 9, 5.5, 8,10,9,8,15],
          backgroundColor: 'rgba(0,0,0,0)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(0,0,0)',// array should have same number of elements as number of dataset
          borderWidth: 1,
          spanGaps: true,
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}