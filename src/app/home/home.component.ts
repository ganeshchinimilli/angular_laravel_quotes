import { AuthService } from './../services/auth.service';
import { NotificationService } from './../services/notification.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
export class User {
  name: any;
  email: any;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  UserProfile :any[]=[];
  constructor(private NotificationService:NotificationService,
    private SpinnerService: NgxSpinnerService, private AuthService:AuthService){
    this.refresh(true);
  }
  ngOnInit() {}
  refresh(parameter:boolean=false){
    this.UserProfile =[];
    this.SpinnerService.show();
    this.AuthService.getData().subscribe(
      (result) => {
        setTimeout(() => {
        this.SpinnerService.hide();
        },100);
        this.UserProfile = result.data;
        if(!parameter){
          this.NotificationService.showSuccess('Quotes Refreshed Successfully','');
        };
      },
      (error) => {
        this.NotificationService.showError(error.errors.message,'');
        this.SpinnerService.hide();
      },
    );

  }
}
