import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire//database';

@Injectable({
  providedIn: 'root'
})

export class StampService {

  constructor(
    private afsg: AngularFireStorage,
    private afdb: AngularFireDatabase
  ) { }
  
}
