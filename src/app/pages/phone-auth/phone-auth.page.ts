import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform,AlertController, NavController, LoadingController ,ToastController} from '@ionic/angular';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { promise } from 'protractor';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-phone-auth',
  templateUrl: './phone-auth.page.html',
  styleUrls: ['./phone-auth.page.scss'],
})
export class PhoneAuthPage implements OnInit {
  // phoneNumber: string;
  // userDetails:any;
  // userPhoneNumber:any;
  // recaptchaVerifier: firebase.default.auth.RecaptchaVerifier;
  number:string;
  verificationId: any;
  code: any;
  phone: number;
  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private afAuth: AngularFireAuth, 
    private afs: AngularFirestore,
    private firebaseAuthentication: FirebaseAuthentication,
    private platform: Platform,
    public toastCtrl: ToastController
  ) {
    // this.firebaseAuthentication.onAuthStateChanged().subscribe(user => {
    //   if (user) {
    //     console.log(JSON.stringify(user));
    //     this.alertCtrl.dismiss();
    //     this.router.navigate(['chat']);
    //   }
    // })
    firebaseAuthentication.onAuthStateChanged().subscribe((user) => {
      if (user) {
        this.router.navigate(['chat']);
      } else {
        this.router.navigate(['']);
      }
    });
   }
  ngOnInit() {
    // this.recaptchaVerifier = new firebase.default.auth.RecaptchaVerifier("recaptcha-container");
  }
  // async signIn(phoneNumber: number,name : string) {
  //   const appVerifier = this.recaptchaVerifier;
  //   const phoneNumberString = "+" + phoneNumber;
  //   const username=name;
  //   firebase.default.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
  //     .then(async (confirmationResult) => {
  //       // SMS sent. Prompt user to type the code from the message, then sign the
  //       // user in with confirmationResult.confirm(code).
  //       let prompt = await this.alertCtrl.create({
  //         header: 'Enter the Confirmation code',
  //         inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
  //         buttons: [
  //           {
  //             text: 'Cancel',
  //             handler: data => { console.log('Cancel clicked'); }
  //           },
  //           {
  //             text: 'Send',
  //             handler: async (data) => {
  //               const loading = await this.loadingController.create();
  //               await loading.present();
  //               confirmationResult.confirm(data.confirmationCode)
  //                 .then(result => {
  //                   loading.dismiss();
  //                   this.router.navigate(['chat',{ phoneNumber : result.user.phoneNumber }]);
  //                   // return this.userDetails;
  //                   console.log('result :', result.user.phoneNumber);
  //                   this.afs.doc(
  //                     `users/${result.user.uid}`
  //                   ).set({
  //                     uid:result.user.uid,
  //                     name:username,
  //                     email: result.user.phoneNumber,
  //                   })
  //                 }).catch(async (error) => {
  //                   loading.dismiss();
  //                   const alert = await this.alertCtrl.create({
  //                     header: 'Please Try Again',
  //                     message: error.message,
  //                     buttons: ['OK'],
  //                   });

  //                   await alert.present();
  //                 })
  //             }
  //           }
  //         ]
  //       });
  //       await prompt.present();
  //     })
  //     .catch(async (error) => {
  //       const alert = await this.alertCtrl.create({
  //         header: 'Please Try Again',
  //         message: error.message,
  //         buttons: ['OK'],
  //       });

  //       await alert.present();
  //       console.error("SMS not sent", error);
  //     });

  // }

  sendOtp() {
    console.log(this.number)
    this.firebaseAuthentication.verifyPhoneNumber('+959'+this.number.toString(),20000).then((verificationId:any) => {
      alert(verificationId);
      this.verifyOtp(verificationId);
    })
  }

   async verifyOtp(verificationId) {
    const prompt =await this.alertCtrl.create({
      cssClass: 'otp',
      header: 'OTP!',
      inputs: [
        {
          name: 'code',
          type: 'number',
          placeholder: 'Enter OTP'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (response) => {
            const smsCode = response.code;
            this.firebaseAuthentication.signInWithVerificationId(verificationId, smsCode).then(res => {
              
              alert(res);
              this.router.navigate(['chat']);
            }).catch(async (error) => {
              const alert = await this.alertCtrl.create({
                header: 'Please Try Again',
                message: error.message,
                buttons: ['OK'],
              });

              await alert.present();
            });
          }
        }
      ]
    })

    await prompt.present();
  }
  //  send()  {
  //   try {
  //     const tell = '+959' + this.phone;
  //     console.log(tell);
  //     // const credential =  this.firebaseAuthentication.verifyPhoneNumber(tell, 60)  ;

  //     // this.verificationId  = credential;
  //     // alert(this.verificationId)
  //     // console.log(this.verificationId)

  //     this.firebaseAuthentication.verifyPhoneNumber(tell, 60).then( (credential) => {
  //       console.log(credential);
  //       this.verificationId = credential.verificationId;
  //     }, (error) => {
  //       console.error(error);
  //       alert(error);
  //      });
  //   } catch(err) {
  //     console.log(err);
      
  //   }
    
    
  // }

  // verify() {
  //   console.log(this.verificationId);
    
  //   this.firebaseAuthentication.signInWithVerificationId(this.verificationId, this.code).then(async (user) => {
  //     console.log(user)
  //     const toast = await this.toastCtrl.create({
  //       message : 'OTP Verified Succesfully.',
  //       duration: 5000
  //     })
  //     toast.present();
  //   });
  // }
  
}
