import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PatientlistComponent } from './patientlist/patientlist.component';
import { PatientRegisterComponent } from './patient-register/patient-register.component';
import { PatientInfoComponent } from './patient-info/patient-info.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
 import { HttpModule } from '@angular/http';
import {PatientService} from "./patient.service";
import { ModalModule } from 'ngx-bootstrap/modal';
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'register', component: PatientRegisterComponent },
  { path: 'list', component: PatientlistComponent },
  { path: 'home', component: PatientInfoComponent },
  { path: 'dashboard', component: DashboardComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    PatientlistComponent,
    PatientRegisterComponent,
    PatientInfoComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ModalModule.forRoot(),
    HttpModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [PatientService  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
