import { AuthService } from './../../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/main/shared/employee.service';
import { NotificationService } from 'src/app/main/shared/notification.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css'],
})
export class InputFormComponent implements OnInit {
  constructor(
    public service: EmployeeService,
    public notification: NotificationService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<InputFormComponent>
  ) { }

  departments = [
    { id: 'Angular Developer', value: 'Angular Developer' },
    { id: 'System Engineer', value: 'System Engineer' },
    { id: 'Devops', value: 'Devops' },
  ];

  gender = [
    { id: 'Male', value: 'Male' },
    { id: 'Female', value: 'Female' },
    { id: 'Others', value: 'Others' },
  ];

  messages!: any;

  ngOnInit() {
    this.service.getEmployees();

    this.authService.errorMessages.subscribe(response => this.messages = response);
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('$key')?.value) {
        this.service.insertEmployee(this.service.form.value);
        this.notification.success(this.messages?.SUCCESS)
      }
      else {
        this.service.updateEmployee(this.service.form.value);
        this.notification.success(this.messages?.EDIT)
      }
      this.service.form.reset();
      this.service.initializeFormGroup();

      this.onClose();
    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }


}
