import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { Patient } from '../patient'
@Component({
  selector: 'app-patient-register',
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.css']
})
export class PatientRegisterComponent implements OnInit {
  patient: Patient[];
  Gender = "Male"
  patientRegisterStatus = false;
  patientRegisterStatusMsg = '';

  constructor(
    private service: PatientService
  ) { }

  ngOnInit() {
  }


  gender(val): any {
    console.log(val);
    this.Gender = val;
    console.log(this.Gender);
  }


  createPatient(name, mobile) {
    console.log(name, mobile);

    this.service.createPatient(this.Gender, name, mobile).
      subscribe(data => {
        console.log(data);
        this.patientRegisterStatus = data;
        if (this.patientRegisterStatus) {
          this.patientRegisterStatusMsg = 'Patient registered successfully';
        } else {
          this.patientRegisterStatusMsg = 'Patient not registered';
        }
      })

  }


}
