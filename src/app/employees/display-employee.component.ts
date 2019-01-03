import { Employee } from './../models/employee.model';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit, OnChanges {
  @Input() employeeId: number         ;
  private _employee: Employee;
  @Input()
  set employee(value: Employee) {
    this._employee = value;
  }
  get employee(): Employee {
    return this._employee;
  }

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propertyName of Object.keys(changes)) {
      // console.log('property: ' ,  propertyName);
      const change = changes[propertyName];
      const from = JSON.stringify(change.previousValue);
      const to = JSON.stringify(change.currentValue);
      console.log(`changed from ${from} to ${to}`);
    }
  }
}
