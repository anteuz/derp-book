import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WeeklyMenuComponent} from '../weekly-menu.component';

const weeklyMenuListRoutes: Routes = [
  {path: '', component: WeeklyMenuComponent},
];

@NgModule({
  imports: [RouterModule.forChild(weeklyMenuListRoutes)],
  exports: [RouterModule]
})
export class WeeklyMenuRoutingModule {}
