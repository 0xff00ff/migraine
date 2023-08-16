import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RecordsComponent } from './pages/records/records.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { ItemComponent } from './pages/item/item.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'records', component: RecordsComponent, data: {saveComponent: true}},
  {path: 'statistics', component: StatisticsComponent},
  {path: 'add', component: ItemComponent, data: {type: 'add'}},
  {path: 'edit/:id', component: ItemComponent, data: {type: 'edit'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
