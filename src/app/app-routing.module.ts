import { SidenavComponent } from './main/components/sidenav/sidenav.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Menu1Component } from './main/components/menu1/menu1.component';
import { Menu2Component } from './main/components/menu2/menu2.component';
import { Menu3Component } from './main/components/menu3/menu3.component';
import { InputTableComponent } from './main/components/input-table/input-table.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'app/table', pathMatch: 'full'
  },

  {
    path: 'app', component: SidenavComponent, children: [

      { path: 'table', component: InputTableComponent },
      { path: 'menu1', component: Menu1Component },
      { path: 'menu2', component: Menu2Component },
      { path: 'menu3', component: Menu3Component }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponent = [
  Menu1Component,
  Menu2Component,
  Menu3Component,
  InputTableComponent
]
