import { Employee } from './../models/employee.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {
  private _employee: Employee;
  @Input()
  set employee(value: Employee) {
    console.log('Previous: ' ,  this._employee ? this._employee.name : 'NULL');
    this._employee = value;
    console.log('Current: ' ,  this._employee.name );
  }
  get employee(): Employee {
    return this._employee;
  }

  constructor() { }

  ngOnInit() {
  }



}
