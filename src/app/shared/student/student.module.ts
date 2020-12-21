import { FormGroup } from '@angular/forms';

export interface MyStudent {
  id?: number;
  name: string;
  surname: string;
  middlename: string;
  phone: string;
  email: string;
  birth: string; 
  group: string;
  direction: string;
  form?: FormGroup;
}