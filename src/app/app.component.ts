import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { BaseService } from './shared/service/base.service';
import { MyStudent } from './shared/student/student.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Golovchenko1540';
  students: MyStudent[];
  isLoaded = false;
  filter = '';

  constructor(private BaseService: BaseService) {
  }

  ngOnInit() {
    this.data().then(() => {
      this.isLoaded = true;
    });
  }

  onDelete(id: number) {
    try {
      this.BaseService.deleteStudent(id);
      console.log ('delete successful!')
    } catch (err) {
      console.log('ERROR : ' + err);
    } finally {
      this.data();
    }
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
          direction: new FormControl({ value: student.direction, disabled: true }, [Validators.required,]),
          group: new FormControl({ value: student.group, disabled: true }, [Validators.required,]),
        });
      }
    }
  }
}
