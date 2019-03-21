import { Employee } from './../models/employee.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ResolvedEmployeeList } from './resolved-employeelist.model';

@Component({
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})

export class ListEmployeesComponent implements OnInit {
  employees: Employee[];
  filteredEmployees: Employee[];
  error: string;
  private _searchTerm: string;

  constructor(private _route: ActivatedRoute, private _router: Router) {
    const resolvedEmployeeList: ResolvedEmployeeList = _route.snapshot.data['employeeList'];

    if (resolvedEmployeeList.error === null) {
      this.employees = resolvedEmployeeList.employeeList;
    } else {
        this.error = resolvedEmployeeList.error;
    }

    if (this._route.snapshot.queryParamMap.has('searchTerm')) {
      this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
    } else {
      this.filteredEmployees = this.employees;
    }
  }

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

  ngOnInit() {
  }

  onDeleteNotification(id: number) {
    const index = this.filteredEmployees.findIndex(e => e.id === id);
    if (index !== -1) {
      this.filteredEmployees.splice(index, 1);
    }
  }
}
