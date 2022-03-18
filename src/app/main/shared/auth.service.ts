import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpRoutingService } from './http-routing.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  errorMessages = new BehaviorSubject<any>(null);

  constructor(private http: HttpRoutingService) { }


  getMessages() {
    this.http.getJsonData('/messages.json').subscribe((res) => {
      this.errorMessages.next(res);
    });
  }
}
