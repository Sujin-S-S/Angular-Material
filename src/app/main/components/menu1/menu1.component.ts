import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-menu1',
  templateUrl: './menu1.component.html',
  styleUrls: ['./menu1.component.css']
})
export class Menu1Component implements OnInit {

  messages!: any;

  employeeRegistrationForm!: FormGroup;
  todayDate = new Date();
  departments = [
    { id: '1', value: 'Department A' },
    { id: '2', value: 'Department B' },
    { id: '3', value: 'Department C' },
  ];

  roles = [
    { id: '1', value: 'Angular Developer' },
    { id: '2', value: 'System Engineer' },
    { id: '3', value: 'Devops' },
  ];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.employeeRegistrationForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      middleName: new FormControl(null),
      lastName: new FormControl(null, [Validators.required]),
      maritalStatus: new FormControl(null),
      dateOfBirth: new FormControl(null, [Validators.required]),
      dateOfJoining: new FormControl(null, [Validators.required]),
      departmentId: new FormControl(null, [Validators.required]),
      roleId: new FormControl(null, [Validators.required]),
      contacts: new FormArray([])
    });
    this.createArray();

    this.authService.errorMessages.subscribe(response => this.messages = response);


  }

  createArray() {
    (this.employeeRegistrationForm?.get('contacts') as FormArray).push(new FormGroup({
      address: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      pincode: new FormControl(null, [Validators.required])
    }));
  }

  removeItem(index: number) {
    (this.employeeRegistrationForm?.get('contacts') as FormArray).removeAt(index);
  }
  arrayControl() {
    return (this.employeeRegistrationForm?.get('contacts') as FormArray).controls;
  }
  getControls(employeeRegistrationForm: any, i: any) {
    return employeeRegistrationForm.get('contacts').controls[i].controls
  }

  onSubmit() {
    if (this.employeeRegistrationForm.valid)
      console.log('Form values: ', this.employeeRegistrationForm);
  }



}
