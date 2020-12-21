import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { BaseService } from 'src/app/shared/service/base.service';
import { MyStudent } from 'src/app/shared/student/student.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: MyStudent[];
  isLoaded = false;
  group = '';
  direction = '';
  check = true;
  constructor(private BaseService: BaseService) {
  }
  ngOnInit() {
    this.data().then(() => {
      this.isLoaded = true;
    });
  }

  sort() {
    if (this.check) {
      this.students = this.students.sort((a, b) => a.surname > b.surname ? 1:-1);
      this.check = false;
    } else {
      this.students = this.students.sort((a, b) => b.surname > a.surname ? 1:-1);
      this.check = true;
    }
  }

  onDelete(id: number) {
    try {
      this.BaseService.deleteStudent(id);
      console.log('delete successful!')
    } catch (err) {
      console.log('ERROR : ' + err);
    } finally {
      this.data();
    }
  }

  getByID() {
    return this.students;
  }

  async onAdd(student: MyStudent) {
    let id = this.students.length > 0 ? this.students[this.students.length - 1].id + 1 : 0;
    student.id = id;
    try {
      await this.BaseService.postStudent(student);
    } catch (err) {
      console.log('ERROR : ' + err);
    } finally {
      this.data();
    }
  }

  async onSave(student: MyStudent) {
    try {
      await this.BaseService.saveStudent(student);
    } catch (err) {
      console.log('ERROR : ' + err);
    }
  }

  async data() {
    try {
      this.students = await this.BaseService.getStudents();
    } catch (err) {
      console.log('ERROR : ' + err);
    } finally {
      for (let student of this.students) {
        student.form = new FormGroup({
          name: new FormControl({ value: student.name, disabled: true }, [Validators.required, Validators.pattern('[а-яА-ЯёЁa-zA-Z]+')]),
          surname: new FormControl({ value: student.surname, disabled: true }, [Validators.required, Validators.pattern('[а-яА-ЯёЁa-zA-Z]+')]),
          middlename: new FormControl({ value: student.middlename, disabled: true }, [Validators.required, Validators.pattern('[а-яА-ЯёЁa-zA-Z]+')]),
          phone: new FormControl({ value: student.phone, disabled: true }, [Validators.required,]),
          email: new FormControl({ value: student.email, disabled: true }, [Validators.required,Validators.email]),
          birth: new FormControl({ value: student.birth, disabled: true }, [Validators.required,]),
          group: new FormControl({ value: student.group, disabled: true }, [Validators.required,]),
          direction: new FormControl({ value: student.direction, disabled: true }, [Validators.required,]),
        });
      }
    }
  }

}
 