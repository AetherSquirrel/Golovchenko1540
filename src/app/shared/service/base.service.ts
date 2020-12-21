import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyStudent } from '../student/student.module';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  routeApi = 'http://localhost:3000/students';
  constructor(private http: HttpClient) {}

  getStudents(): Promise<any> {
    return this.http.get(this.routeApi).toPromise();
  }

  postStudent(student: MyStudent) {
    let body = { id: student.id, name: student.name, surname: student.surname, middlename:student.middlename, phone: student.phone, 
      email: student.email, birth:student.birth, direction:student.direction, group:student.group};
    return this.http.post(this.routeApi, body).toPromise();
  }

  deleteStudent(id: number) {
    this.http.delete(`${this.routeApi}/${id}`).subscribe(() => console.log("Student deleted"));
  }

  saveStudent(student: MyStudent) {
    let body = { id: student.id, name: student.name, surname: student.surname, middlename:student.middlename, phone: student.phone, 
      email: student.email, birth:student.birth, direction:student.direction, group:student.group};
    this.http.put(`${this.routeApi}/${body.id}`, body).subscribe(() => console.log("Student updated"));
  }

}
