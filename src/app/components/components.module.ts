import { NgModule } from "@angular/core";
import { EmojiPickerModalComponent } from './emoji-picker-modal/emoji-picker-modal.component';
import { StampComponent } from './stamp/stamp.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {StickerComponent} from './sticker/sticker.component';

@NgModule(
    {
        declarations:[
        EmojiPickerModalComponent,
        StampComponent,
        StickerComponent
        ],
        entryComponents:
        [
            EmojiPickerModalComponent,
        ],
        imports:
        [
            CommonModule,
            IonicModule
        ],
        exports:[
          EmojiPickerModalComponent,
          StampComponent,
          StickerComponent
        ]
    })
export class ComponentsModule{}