import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { Menu2Component } from './components/menu2/menu2.component';
import { Menu3Component } from './components/menu3/menu3.component';



@NgModule({
  declarations: [
    DeleteDialogComponent,
    Menu2Component,
    Menu3Component
  ],
  imports: [
    CommonModule
  ]
})
export class MainModule { }
