import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HighChartPageRoutingModule } from './high-chart-routing.module';

import { HighChartPage } from './high-chart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HighChartPageRoutingModule
  ],
  declarations: [HighChartPage]
})
export class HighChartPageModule {}
