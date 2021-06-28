import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

import { Platform, AlertController } from '@ionic/angular';
import firebase from 'firebase/app';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  pushes: any = [];
  
  public hasPermission: any;
  public token: any;
  public pushPayload: any;
  constructor(
    private platform: Platform,
    private router:Router
  ) {
  }
  ngOnInit() {
    firebase.initializeApp({
        apiKey: "AIzaSyAxpdb5QeRP3GTs3oZcr4gLGUOM8ShUr6U",
        authDomain: "messagechat-970b8.firebaseapp.com",
        databaseURL: "https://messagechat-970b8-default-rtdb.firebaseio.com",
        projectId: "messagechat-970b8",
        storageBucket: "messagechat-970b8.appspot.com",
        messagingSenderId: "414065889300",
        appId: "1:414065889300:web:90208163f45fe6bd121701",
        measurementId: "G-KMBXY6KTHV"
      }
    );
  }

  highChart(){
    this.router.navigate(['high-chart'])
  }
  phoneAuth(){
    this.router.navigate([''])
  }

}
