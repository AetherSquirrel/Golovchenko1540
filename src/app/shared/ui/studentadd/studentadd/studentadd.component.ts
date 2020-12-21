import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyStudent } from 'src/app/shared/student/student.module';

@Component({
  selector: 'app-studentadd',
  templateUrl: './studentadd.component.html', 
  styleUrls: ['./studentadd.component.css']
})
export class StudentaddComponent implements OnInit {

  mask = ['8', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  birthmask = [/[1-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  form: FormGroup;
  @Input() age: number;
  @Output() addStudent = new EventEmitter<MyStudent>();
  constructor() { }
  ngOnInit() { this.form = this.getFormGroup(null, null, null, null, null, null, null, null); }

  onAddStudent() {
    let student: MyStudent = {
      name: this.form.value.name,
      surname: this.form.value.surname,
      middlename: this.form.value.middlename,
      email: this.form.value.email,
      birth: this.form.value.birth,
      phone: this.form.value.phone,
      group: this.form.value.group,
      direction: this.form.value.direction
    };

    student.phone = student.phone.replace(/\D/g, '');
    if (student.name.length > 0 && student.surname.length > 0 && student.middlename.length > 0
      && student.email.length > 0 && student.phone.length == 11 && student.group.length > 0 && student.direction.length > 0 && student.birth.length > 0 ) {
      try {
        this.addStudent.emit(student);
      } catch (err) {
        console.log('ERROR : ' + err);
      } finally {
        this.form.reset();
      }
    } else alert('Please provide all data!');
  }

  getFormGroup(name: string, surname: string, middlename: string, phone: string, email: string, birth: string, group: string, direction: string) {
    return new FormGroup({
      name: new FormControl(name, [Validators.required, Validators.pattern('[а-яА-ЯёЁa-zA-Z]+')]),
      surname: new FormControl(surname, [Validators.required, Validators.pattern('[а-яА-ЯёЁa-zA-Z]+')]),
      middlename: new FormControl(middlename, [Validators.required, Validators.pattern('[а-яА-ЯёЁa-zA-Z]+')]),
      phone: new FormControl(phone, [Validators.required,]),
      email: new FormControl(email, [Validators.required, Validators.email]),
      birth: new FormControl(birth, [Validators.required,]),
      group: new FormControl(birth, [Validators.required,]),
      direction: new FormControl(birth, [Validators.required,])
    });
  }
}
