import { EmployeeService } from './employee.service';
import { Employee } from './../models/employee.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(private _route: ActivatedRoute, private _employeeService: EmployeeService, private _router: Router) { }

  changeEmployeeName() {
    this.employees[0].name = 'Jordan';
    this.filteredEmployees = this.filterEmployees(this._searchTerm);
  }

  // onMouseMove() {
  //   console.log('mouseMove: ');
  // }

  ngOnInit() {
    this.filteredEmployees = this.employees = this._employeeService.getEmployees();
    // query params
    //  console.log('has: ' ,  this._route.snapshot.queryParamMap.has('searchTerm'));
    //  console.log('get: ' ,  this._route.snapshot.queryParamMap.get('searchTerm'));
    //  console.log('getAll: ' ,  this._route.snapshot.queryParamMap.getAll('searchTerm'));
    //  console.log('keys: ' ,  this._route.snapshot.queryParamMap.keys);

    // params
    // console.log('has: ' ,  this._route.snapshot.paramMap.has('searchTerm'));
    // console.log('get: ' ,  this._route.snapshot.paramMap.get('searchTerm'));
    // console.log('getAll: ' ,  this._route.snapshot.paramMap.getAll('searchTerm'));
    // console.log('keys: ' ,  this._route.snapshot.paramMap.keys);

    if (this._route.snapshot.queryParamMap.has('searchTerm')) {
      this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
    } else {
      this.filteredEmployees = this.employees;
    }
  }

  onClick(employeeId: number) {
    this._router.navigate(['/employees', employeeId],
      { queryParams: { 'searchTerm': this._searchTerm, 'testParam': 'testValue' } });
  }

}
