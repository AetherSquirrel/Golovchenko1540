import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MyStudent } from 'src/app/shared/student/student.module';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css']
})
export class StudentlistComponent implements OnInit {

  @Input() title: string;
  @Input() students: MyStudent[] = [];
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();
  @Output() save = new EventEmitter<MyStudent>();
  form: FormGroup;
  mask = ['8', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  birthmask = [/[1-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  constructor() { }

  ngOnInit(): void {
  }

  onDelete(id: number) {
    this.delete.emit(id);
    setTimeout(this.Reload, 100);
    console.log(id);
  }

  Reload() {
    location.reload();
  }

  onRedact(student: MyStudent) {
    student.form.enable();
    console.log(student);
  }

  onSave(student: MyStudent) {
    if (student.form.valid) {
      student.name = student.form.controls.name.value;
      student.surname = student.form.controls.surname.value;
      student.middlename = student.form.controls.middlename.value;
      student.phone = student.form.controls.phone.value.replace(/\D/g, '');
      student.email = student.form.controls.email.value;
      student.birth = student.form.controls.birth.value;
      student.group = student.form.controls.group.value;
      student.direction = student.form.controls.direction.value;
      if (student.phone.length == 11) {
        console.log(student);
        this.save.emit(student);
        student.form.disable();

      } else
        alert('Please, provide all data!');
    } else
      alert('Please, provide all data!');
    setTimeout(this.Reload, 100);
  }

}
 