import { InputFormComponent } from '../input-form/input-form.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from 'src/app/main/shared/employee.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationService } from 'src/app/main/shared/notification.service';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-input-table',
  templateUrl: './input-table.component.html',
  styleUrls: ['./input-table.component.css']
})
export class InputTableComponent implements OnInit {

  listData!: MatTableDataSource<any>
  displayedColumns: string[] = ['fullName', 'email', 'mobile', 'city', 'department', 'actions']
  searchKey!: string;
  messages!: any;




  constructor(public service: EmployeeService,
    public dialog: MatDialog,
    public notification: NotificationService,
    private authService: AuthService) { }

  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator

  ngOnInit() {
    this.service.getEmployees().subscribe((list) => {
      let array = list.map((item) => {
        return {
          $key: item.key,
          ...item.payload.val(),
        };
      });
      this.listData = new MatTableDataSource(array);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });

    this.authService.errorMessages.subscribe(response => this.messages = response);
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    this.service.initializeFormGroup
    const dialogConfig = new MatDialogConfig
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%"
    this.dialog.open(InputFormComponent, dialogConfig);
  }

  onEdit(row: any) {
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%"
    this.dialog.open(InputFormComponent, dialogConfig);
  }

  onDelete($key: any) {

    this.service.openConfirmDialog()
      .afterClosed().subscribe(response => {
        if (response) {
          this.service.deleteEmployee($key);
          this.notification.warn(this.messages?.DELETE)
        }
      })
  }



}
function result($key: any, result: any) {
  throw new Error('Function not implemented.');
}

