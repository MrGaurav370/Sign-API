import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNewComponent } from './create-new/create-new.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogInComponent } from './log-in/log-in.component';

const routes: Routes = [
  {path: 'log-in', component: LogInComponent},
  {path: 'create-new', component: CreateNewComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '**', redirectTo: '/log-in'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
