import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, Input } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sticker',
  templateUrl: './sticker.component.html',
  styleUrls: ['./sticker.component.scss'],
})
export class StickerComponent implements OnInit {
  showEmojiPicker = true; //To show/hide the emoji picker from footer
  showGifPicker = false; //To show/hide the gif picker from footer

  @Input('isInModal') isInModal=false; //To determine whether this componet is created using a modal or not
  @Output('onEmojiSelect') emojiSelectionEvent=new EventEmitter(); //TO emmit event when an emoji is selected
  @Output('onGifSelect') gifSelectionEvent=new EventEmitter(); //TO emmit event when an emoji is selected
  constructor(
    private modalCtrl:ModalController
  ) { }

  ngOnInit() {}
  showEmoji(){
    this.showEmojiPicker=true;
    this.showGifPicker=false;
  }
  showGif(){
    this.showGifPicker=true;
    this.showEmojiPicker=false;
  }

  addEmoji(event)
  {//Concatinate the emoji with text
    console.log(event.data);
    let selectionData={
      data:event.data
    };

    this.emojiSelectionEvent.emit(selectionData);
    if(this.isInModal)
    {
      this.modalCtrl.dismiss(selectionData); //Dismiss the modal with data
    }
  }

  gifAdd(event) {
    console.log(event.data);
    let selectionData={
      data:event.data
    };

    this.gifSelectionEvent.emit(selectionData);
    if(this.isInModal)
    {
      this.modalCtrl.dismiss(selectionData); //Dismiss the modal with data
    }
  }

}
