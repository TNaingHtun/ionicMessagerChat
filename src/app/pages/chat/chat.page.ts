import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ChatService } from '../../services/chat.service';
import { Router,ActivatedRoute, ParamMap } from '@angular/router';
import { ActionSheetController,ModalController,LoadingController } from '@ionic/angular';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { EmojiPickerModalComponent } from 'src/app/components/emoji-picker-modal/emoji-picker-modal.component';
import { GiphyService } from '../../services/giphy.service';
import {PhoneAuthPage} from '../phone-auth/phone-auth.page'
 
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  phoneNumber:any;
  messages: Observable<any[]>;
  newMsg = '';
  image='';
  base64Img = '';
  showEmojiPicker = false; //To show/hide the emoji picker from footer
  showGifPicker = false; //To show/hide the gif picker from footer
  gifUrl: string;
  galleryOptions: CameraOptions = {
    quality: 50,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    allowEdit: false,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
  }
  
  constructor(
    private phoneAuth: PhoneAuthPage,
    private chatService: ChatService,
    private router: Router,
    private route: ActivatedRoute,
    private actionSheet: ActionSheetController,
    private camera: Camera,
    private modalCtrl: ModalController,
    private giphyService: GiphyService,
    private loadingController: LoadingController,
  ) {
    //On Keyboard up event, hide the emoji picker
    window.addEventListener('keyboardWillShow', (event) => {
      // Describe your logic which will be run each time when keyboard is about to be shown.
      console.log('keyboardWillShow');
      this.showEmojiPicker = true;
      
    });
   }
 
  ngOnInit() {
    this.messages = this.chatService.getChatMessages();
    console.log(this.messages)
    this.route.params.subscribe(params => {
      this.phoneNumber = params.phoneNumber;
      console.log(this.phoneNumber);
    });
  }
 
  sendMessage() {
    this.chatService.addChatMessage(this.newMsg).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
    });
  }
 
  async signOut() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.chatService.signOut().then(() => {
      loading.dismiss();
      this.router.navigateByUrl('/phone-auth', { replaceUrl: true });
    });
  }
  async presentImageSheet() {
    const actionSheet = await this.actionSheet.create({
      header: 'What would you like to add',
      buttons: [{
        text: 'Gallery',
        role: 'destructive',
        icon: 'image',
        handler: () => {
          this.getGallery();
          console.log('gallery clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  
  getGallery(){
    this.camera.getPicture(this.galleryOptions).then((imgData)=>{
      this.base64Img = 'data:image/jpeg;base64,' + imgData;
      this.image = this.base64Img;
      console.log('path :', this.image);
      this.newMsg = this.image;
      this.chatService.addChatMessage(this.newMsg).then(() => {
        this.newMsg = '';
        this.content.scrollToBottom();
      });
    }).catch(e=>{
      console.log(e);
    })
  }

  
  addEmoji(event)
  {
    this.newMsg = this.newMsg + event.data; //Concatinate the emoji with text
    console.log(event.data)
  }

  gifAdd(event) {
    this.newMsg = event.data;
    console.log(event.data);
    this.chatService.addChatMessage(this.newMsg).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
    });
  }
  highChart(){
    this.router.navigate(['high-chart'])
  }
}