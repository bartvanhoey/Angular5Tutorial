import { PipeTransform, Pipe } from '@angular/core';
import { Employee } from '../models/employee.model';

@Pipe({
    name: 'employeeFilter',
    pure: false
})
export class EmployeeFilterPipe implements PipeTransform {
    private counter = 0;

    transform(employees: Employee[], searchTerm: string): Employee[] {
        this.counter++;
        console.log('filter pipe executed counter: ' ,  this.counter);
        if (!employees || !searchTerm) { return employees; }
        return employees.filter(employee => {
            return employee.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
        });
    }
}
