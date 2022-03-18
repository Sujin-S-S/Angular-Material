import { Component } from '@angular/core';
import { AuthService } from './main/shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CompleteAngularMaterialApp';

  constructor(private authservice: AuthService) { }

  ngOnInit() {
    this.authservice.getMessages();
  }
}
