import { Component, OnInit } from '@angular/core';

import { Platform ,AlertController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StampService } from '../services/stamp.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire//database';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  imageUrl: any[]=[];
  constructor(
    private afsg: AngularFireStorage,
    private afdb: AngularFireDatabase
  ) {
   }
  ngOnInit(){}
 
 
}