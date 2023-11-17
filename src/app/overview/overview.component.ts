import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  private _chartLabels: string[] = ['Valid', 'Expiring', 'Expired', 'Revoked'];
  private _certificateData: ChartData<'doughnut'> = {
    labels: this._chartLabels,
    datasets: [
      {
        data: [150, 6, 22, 19],
        backgroundColor: [
          '#62d178',
          '#d1b769',
          '#d14156',
          '#292C8F',
        ],
        hoverOffset: 4
      }
    ],
  };

  private _keyData: ChartData<'doughnut'> = {
    labels: this._chartLabels,
    datasets: [
      {
        data: [69, 5, 42, 19],
        backgroundColor: [
          '#62d178',
          '#d1b769',
          '#d14156',
          '#292C8F',
        ],
        hoverOffset: 4
      }
    ],
  };

  private _chartType: ChartType = 'doughnut';

  constructor() {

  }

  public ngOnInit(): void {

  }

  public get certificateData(): ChartData<'doughnut'> {
    return this._certificateData;
  }

  public get keyData(): ChartData<'doughnut'> {
    return this._keyData;
  }

  public get chartType(): ChartType {
    return this._chartType;
  }
}
