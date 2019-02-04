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
  filteredEmployees: Employee[];
  private _searchTerm: string;

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployees = this.filterEmployees(value);
  }

  filterEmployees(searchTerm: string): Employee[] {
    return this.employees.filter(employee => employee.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }

  constructor(private employeeService: EmployeeService, private _router: Router) { }

  changeEmployeeName() {
    this.employees[0].name = 'Jordan';
    this.filteredEmployees = this.filterEmployees(this._searchTerm);
  }

  // onMouseMove() {
  //   console.log('mouseMove: ');
  // }

  ngOnInit() {
   this.filteredEmployees = this.employees = this.employeeService.getEmployees();
  }

  onClick(employeeId: number) {
    this._router.navigate(['/employees', employeeId],
     { queryParams: { 'searchTerm' : this._searchTerm, 'testParam' : 'testValue' }});
  }

}
