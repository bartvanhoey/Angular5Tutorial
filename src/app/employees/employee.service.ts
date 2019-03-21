import { Employee } from './../models/employee.model';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class EmployeeService {
  private listEmployees: Employee[] = [{
    id: 1,
    name: 'Mark',
    gender: 'male',
    contactPreference: 'email',
    email: 'mark@pragimtech.com',
    dateOfBirth: '1988/10/25',
    department: '3',
    isActive: true,
    photoPath: 'assets/images/mark.png'
  },
  {
    id: 2,
    name: 'Mary',
    gender: 'female',
    contactPreference: 'phone',
    phoneNumber: 2345978640,
    dateOfBirth: '1979/11/20',
    department: '2',
    isActive: true,
    photoPath: 'assets/images/mary.png'
  },
  {
    id: 3,
    name: 'John',
    gender: 'male',
    contactPreference: 'phone',
    phoneNumber: 5432978640,
    dateOfBirth: '1976/3/25',
    department: '3',
    isActive: false,
    photoPath: 'assets/images/john.png'
  }];

  constructor(private _http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
      return this._http.get<Employee[]>('http://localhost:3000/employees')
      .pipe(catchError(this.handleError));
  }

  getEmployee(id: number): Employee {
    return this.listEmployees.find(emp => emp.id === id);
  }

  saveEmployee(employee: Employee) {
    if (employee.id === null) {
     const maxId =  this.listEmployees.reduce( (emp1, emp2) => {
        return (emp1.id > emp2.id) ? emp1 : emp2;
      }).id;
      employee.id = maxId + 1;
      this.listEmployees.push(employee);
    } else {
      const foundIndex = this.listEmployees.findIndex(emp => emp.id === employee.id);
      this.listEmployees[foundIndex] = employee;
    }
  }

  deleteEmployee(id: number) {
    const index = this.listEmployees.findIndex(e => e.id === id);
    if (index !== -1) {
      this.listEmployees.splice(index, 1);
    }
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.log('Client Side Error: ' ,  errorResponse.error.message);
    } else {
      console.log('Server Side Error: ' ,  errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }
}
