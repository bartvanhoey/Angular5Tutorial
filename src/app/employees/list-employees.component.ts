import { EmployeeService } from './employee.service';
import { Employee } from './../models/employee.model';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})

export class ListEmployeesComponent implements OnInit {
  employees: Employee[] ;
  employeeToDisplay: Employee;
  private arrayIndex = 1;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employees = this.employeeService.getEmployees();
    this.employeeToDisplay = this.employees[0];
  }

  nextEmployee(): void {
      if (this.arrayIndex <= this.employees.length - 1) {
        this.employeeToDisplay = this.employees[this.arrayIndex];
        this.arrayIndex++;
      } else   {
        this.employeeToDisplay = this.employees[0];
        this.arrayIndex = 1;
      }
  }

}
