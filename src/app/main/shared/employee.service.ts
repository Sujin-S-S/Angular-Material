import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import * as _ from 'lodash'
import { DeleteDialogComponent } from '../components/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
// import { HttpRoutingService } from './http-routing.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private firebase: AngularFireDatabase, private dialog: MatDialog) { }

  employeeList?: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    city: new FormControl(''),
    gender: new FormControl(1),
    department: new FormControl(0),
    // hireDate: new FormControl(''),
    isPermanent: new FormControl(false),
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      fullName: '',
      email: '',
      mobile: '',
      city: '',
      gender: '1',
      department: 0,
      // hireDate: '',
      isPermanent: false,
    });
  }

  getEmployees() {
    this.employeeList = this.firebase.list('employees');
    return this.employeeList.snapshotChanges();
  }

  insertEmployee(employee: any) {
    this.employeeList?.push({
      fullName: employee.fullName,
      email: employee.email,
      mobile: employee.mobile,
      city: employee.city,
      gender: employee.gender,
      department: employee.department,
      // hireDate: employee.hireDate,
      isPermanent: employee.isPermanent,
    });
  }

  updateEmployee(employee: any) {
    this.employeeList?.update(employee.$key, {
      fullName: employee.fullName,
      email: employee.email,
      mobile: employee.mobile,
      city: employee.city,
      gender: employee.gender,
      department: employee.department,
      // hireDate: employee.hireDate,
      isPermanent: employee.isPermanent,
    });
  }

  deleteEmployee($key: any) {
    this.employeeList?.remove($key);
  }

  populateForm(element: string[]) {
    this.form.setValue(_.omit(element, 'hireDate'))
  }

  openConfirmDialog() {
    return this.dialog.open(DeleteDialogComponent, {
      width: "23%",
      height: "170px",
      disableClose: true
    })
  }
  // getEmployee() {
  //   return this.http.getMethod('getEmployee');
  // }
}

//behaviour subject