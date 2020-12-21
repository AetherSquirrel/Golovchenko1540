import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipe'
})
export class PipePipe implements PipeTransform {

  transform(students: any[], group: string, direction: string): any[] {
    if (group === '' && direction === '') {
      return students;
    } else if (direction === ''){
      return students.filter((student) => {
        return student.group.toLowerCase().includes(group.toLowerCase());
      });
    } else if (group === ''){
      return students.filter((student) => {
        return student.group.toLowerCase().includes(direction.toLowerCase());
      });
    } else {
      return students.filter((student) => {
        return student.group.toLowerCase().includes(direction.toLowerCase()) || student.direction.toLowerCase().includes(direction.toLowerCase());
      });
    }
  }
 
}
