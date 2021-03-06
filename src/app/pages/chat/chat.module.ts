import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPageRoutingModule } from './chat-routing.module';
import { Camera } from '@ionic-native/camera/ngx';

import { ChatPage } from './chat.page';
import { AppModule } from '../../app.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { from } from 'rxjs';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [ChatPage]
})
export class ChatPageModule {}
