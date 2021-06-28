import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  credentialForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.credentialForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  async signUp() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.chatService
      .signup(this.credentialForm.value)
      .then(
        (user) => {
          loading.dismiss();
          this.router.navigateByUrl('/chat', { replaceUrl: true });
        },
        async (err) => {
          loading.dismiss();
          const alert = await this.alertController.create({
            header: 'Sign up failed',
            message: err.message,
            buttons: ['OK'],
          });
 
          await alert.present();
        }
      );
  }
  // Easy access for form fields
  get name() {
    return this.credentialForm.get('name');
  }
  get email() {
    return this.credentialForm.get('email');
  }
  
  get password() {
    return this.credentialForm.get('password');
  }
  signIn() {
    this.router.navigate([''])
  }

}
