import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewComponent } from './overview.component';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    OverviewComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    NgChartsModule,
    OverviewRoutingModule
  ]
})
export class OverviewModule { }
