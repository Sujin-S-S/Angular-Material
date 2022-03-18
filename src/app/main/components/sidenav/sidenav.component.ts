import { Component, OnInit } from '@angular/core';
// import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  // @ViewChild('sidenav', { static: true }) snav?: MatSidenav;
  constructor() {
  }

  ngOnInit(): void {
  }

  // ngOnDestroy() {
  //   this.mobileQuery?.removeListener(this.mobileQueryListener);
  // }

}
