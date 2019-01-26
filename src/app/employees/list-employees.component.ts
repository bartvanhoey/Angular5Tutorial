import { EmployeeService } from './employee.service';
import { Employee } from './../models/employee.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})

export class ListEmployeesComponent implements OnInit {
  employees: Employee[];
  searchTerm: string;

  constructor(private employeeService: EmployeeService, private _router: Router) { }

  changeEmployeeName() {
      this.employees[0].name = 'Jordan';
    // const newEmployeeArray: Employee[] = Object.assign([], this.employees);
    // newEmployeeArray[0].name = 'Jordan';
    // this.employees = newEmployeeArray;
  }

  onMouseMove() {
    console.log('mouseMove: ');
  }

  ngOnInit() {

    this.employees = this.employeeService.getEmployees();
  }

  onClick(employeeId: number) {
    this._router.navigate(['/employees', employeeId]);
  }

}
