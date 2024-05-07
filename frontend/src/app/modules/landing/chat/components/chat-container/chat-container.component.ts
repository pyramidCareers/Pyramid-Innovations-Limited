import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { ChatItem } from '../../models/chat-item';
import { PusherService } from '../../services/pusher.service';
@Component({
    selector: 'app-chat-container',
    templateUrl: './chat-container.component.html',
    styleUrls: ['./chat-container.component.scss'],
})
export class ChatContainerComponent {
    constructor(private pusherService: PusherService) {}
    isMyMsg: boolean = false;
    isChatItemClicked: boolean = false;
    isChatMenuVisible: boolean = true;
    isChatSectionVisible: boolean = true;
    screenWidth: number;
    @Output() chatUIOutput: EventEmitter<any> = new EventEmitter<any>();

    openedChatItem: ChatItem = {
        id: '',
        firstname: '',
        lastname: '',
        max_created_at: '',
    };

    ngOnInit() {
        this.setChatUI();
    }

    openChat(chatItem: any) {
        this.openedChatItem = chatItem;
        this.isChatItemClicked = true;
        this.setChatUI();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.setChatUI();
    }

    emitChatUI() {
        const chatUIResult = this.setChatUI(); // Call the function to get the result
        this.chatUIOutput.emit(chatUIResult); // Emit the result using the event emitter
    }

    setChatUI() {
        this.screenWidth = window.innerWidth;
        if (this.screenWidth < 760 && !this.isChatItemClicked) {
            this.isChatSectionVisible = false;
            this.isChatMenuVisible = true;
        } else if (this.screenWidth < 760 && this.isChatItemClicked) {
            this.isChatMenuVisible = false;
            this.isChatSectionVisible = true;
        } else if (this.screenWidth >= 760) {
            this.isChatMenuVisible = true;
            this.isChatSectionVisible = true;
        }
    }

    openMenuSmallScreen(val: any) {
        if (val == 1) {
            this.isChatSectionVisible = false;
            this.isChatMenuVisible = true;
        }
    }
}
