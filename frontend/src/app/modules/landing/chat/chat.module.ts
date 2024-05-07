import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms'; 
import { ChatRoutingModule } from './chat-routing.module';
import { ChatContainerComponent } from './components/chat-container/chat-container.component';
import { ChatItemComponent } from './components/chat-item/chat-item.component';
import { ChatMenuComponent } from './components/chat-menu/chat-menu.component';
import { ChatSectionComponent } from './components/chat-section/chat-section.component';


@NgModule({
  declarations: [
    ChatContainerComponent,
    ChatItemComponent,
    ChatMenuComponent,
    ChatSectionComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule,
    MatIconModule
  ]
})
export class ChatModule { }
