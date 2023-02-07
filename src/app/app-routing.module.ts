import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthSelectionComponent } from './components/month-selection/month-selection.component';
import { MonthViewComponent } from './components/month-view/month-view.component';

const routes: Routes = [
  { path: '', redirectTo: `/home/${new Date().getFullYear()}`, pathMatch: 'full' },
  { path:"home/:year", component:MonthSelectionComponent },
  { path:"home/:year/:month", component:MonthViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
