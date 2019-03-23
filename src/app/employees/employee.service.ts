import { Employee } from './../models/employee.model';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

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

  private readonly _baseUrl = 'http://localhost:3000/employees';

  constructor(private _http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this._http.get<Employee[]>(this._baseUrl)
      .pipe(catchError(this.handleError));
  }

  getEmployee(id: number): Employee {
    return this.listEmployees.find(emp => emp.id === id);
  }

  saveEmployee(employee: Employee): Observable<Employee> {
    if (employee.id === null) {
     return this._http.post<Employee>(this._baseUrl, employee, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.handleError));
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
      console.log('Client Side Error: ', errorResponse.error.message);
    } else {
      console.log('Server Side Error: ', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }
}
