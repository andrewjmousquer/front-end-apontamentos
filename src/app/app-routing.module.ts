import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

import { ClassifierFormComponent } from './portal/form/classifier-form/classifier-form.component';
import { AccessListFormComponent } from './portal/form/access-list-form/access-list-form.component';
import { CheckpointFormComponent } from './portal/form/checkpoint-form/checkpoint-form.component';
import { MenuFormComponent } from './portal/form/menu-form/menu-form.component';
import { ParameterFormComponent } from './portal/form/parameter-form/parameter-form.component';
import { UserFormComponent } from './portal/form/user-form/user-form.component';
import { HoldingFormComponent } from './portal/form/holding-form/holding-form.component';
import { LoginComponent } from './portal/template/login/login.component';
import { LogoutComponent } from './portal/template/logout/logout.component';
import { HomeComponent } from './portal/template/home/home.component';
import { ReportComponent } from './portal/template/report/report.component';
import { SettingsFormComponent } from './portal/form/settings-form/settings-form.component';
import { ErrorComponent } from './portal/template/error/error.component';
import { StageFormComponent } from './page/stage-form/stage-form.component';
import { TeamFormComponent } from './page/team-form/team-form.component';
import { ChecklistPageComponent } from './page/checklist-form/checklist-page.component';
import { AppointmentFormComponent } from './page/appointment-form/appointment-form.component';
import { OSViewFormComponent } from './page/os-view-form/os-view-form.component';
import { OSDetailFormComponent } from './page/os-detail-form/os-detail-form.component';
import { ConsultOSFormComponent } from './page/consult-os-form/consult-os-form.component';
import { FillChecklistFormComponent } from './page/fill-checklist-form/fill-checklist-form.component';



export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'accesslist-form', component: AccessListFormComponent, canActivate: [AuthGuard] },
  { path: 'checkpoint-form', component: CheckpointFormComponent, canActivate: [AuthGuard] },
  { path: 'holding-form', component: HoldingFormComponent, canActivate: [AuthGuard] },
  { path: 'menu-form', component: MenuFormComponent, canActivate: [AuthGuard] },
  { path: 'parameter-form', component: ParameterFormComponent, canActivate: [AuthGuard] },
  { path: 'settings-form', component: SettingsFormComponent, canActivate: [AuthGuard] },
  { path: 'user-form', component: UserFormComponent, canActivate: [AuthGuard] },
  { path: 'reports', component: ReportComponent, canActivate: [AuthGuard] },
  { path: 'classifier-form', component: ClassifierFormComponent, canActivate: [AuthGuard] },
  { path: 'stage-form', component: StageFormComponent, canActivate: [AuthGuard] },
  { path: 'team-form', component: TeamFormComponent, canActivate: [AuthGuard] },
  { path: 'checklist-form', component: ChecklistPageComponent, canActivate: [AuthGuard] },
  { path: 'time-notes-form', component: AppointmentFormComponent, canActivate: [AuthGuard] },
  { path: 'os-view-form', component: OSViewFormComponent, canActivate: [AuthGuard] },
  { path: 'os-detail-form', component: OSDetailFormComponent, canActivate: [AuthGuard] },
  { path: 'consult-os-form', component: ConsultOSFormComponent, canActivate: [AuthGuard] },
  { path: 'fill-checklist-form', component: FillChecklistFormComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const appRoutingModule = RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' });
