import { Department } from './../models/department.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  departments: Department[] = [
    { id: 1, name: 'Helpdesk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' },
    { id: 5, name: 'Administration' }
  ];

  constructor() { }

  ngOnInit() {
  }

  saveEmployee(employeeForm: NgForm): void {
    console.log('employeeForm: ', employeeForm.value);
  }
}
