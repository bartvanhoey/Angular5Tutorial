import { EmployeeService } from './employee.service';
import { Employee } from './../models/employee.model';
import { Department } from './../models/department.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  @ViewChild('employeeForm') public createEmployeeForm: NgForm;
  previewPhoto = false;
  componentTitle: string;
  datePickerConfig: Partial<BsDatepickerConfig>;
  employee: Employee = {
    id: null,
    name: null,
    gender: null,
    contactPreference: null,
    phoneNumber: null,
    email: null,
    dateOfBirth: null,
    department: 'select',
    isActive: null,
    photoPath: null
  };

  departments: Department[] = [
    { id: 1, name: 'Helpdesk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' },
    { id: 5, name: 'Administration' }
  ];

  constructor(private _route: ActivatedRoute, private _employeeService: EmployeeService, private _router: Router) {
    this.datePickerConfig = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      dateInputFormat: 'DD/MM/YYYY',
    });
  }

  togglePreview() {
    this.previewPhoto = !this.previewPhoto;
  }

  ngOnInit() {
    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getEmployee(id);
    });
  }

  private getEmployee(id: number): any {
    if (id === 0) {
      this.employee = {
        id: null,
        name: null,
        gender: null,
        contactPreference: null,
        phoneNumber: null,
        email: null,
        dateOfBirth: null,
        department: 'select',
        isActive: null,
        photoPath: null
      };
      this.componentTitle = 'Create Employee';
      this.createEmployeeForm.reset();
    } else {
      this.componentTitle = 'Edit Employee';
      this.employee = Object.assign({}, this._employeeService.getEmployee(id));
    }
  }

  saveEmployee(): void {
    const newEmployee: Employee = Object.assign({}, this.employee);
    this._employeeService.saveEmployee(newEmployee);
    this.createEmployeeForm.reset();
    // set default values after form reset
    // this.createEmployeeForm.reset({name: 'TestName', contactPref: 'phone'});
    this._router.navigate(['list']);
  }
}
