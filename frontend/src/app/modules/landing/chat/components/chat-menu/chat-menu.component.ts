import {
    Component,
    EventEmitter,
    OnInit,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import { ChatText } from '../../models/chat-text';
import { ChatService } from '../../services/chat.service';
import { SearchUserService } from '../../services/search-user.service';
import { ChatItem } from './../../models/chat-item';

@Component({
    selector: 'app-chat-menu',
    templateUrl: './chat-menu.component.html',
    styleUrls: ['./chat-menu.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ChatMenuComponent implements OnInit {
    constructor(
        private chatAPI: ChatService,
        private searchAPI: SearchUserService
    ) {}

    @Output() clickedChat = new EventEmitter<any>();

    screenWidth: number;
    selectedChat: ChatItem;
    isMyMsg: boolean = false;
    chatContacts: any[] = [];
    chatMessages: any[] = [];
    chatRecords: ChatText[] = [];
    isLaptopScreen: boolean = false;
    isChatMenuVisible: boolean = true;
    isChatItemClicked: boolean = false;
    isChatSectionVisible: boolean = true;
    resultsAllSearch: string[] = [];
    searchValue: string = '';

    ngOnInit() {
        this.chatAPI.getContacts().subscribe(
            (res: any) => {
                this.chatContacts = res?.contacts;

                this.setChatUI();
                if (this.isLaptopScreen) {
                    // Emit the first contact
                    this.clickedChat.emit(
                        this.chatContacts ? this.chatContacts[0] : null
                    );
                    // Set the first contact as the selected one
                    this.selectedChat = this.chatContacts
                        ? this.chatContacts[0]
                        : null;
                }
            },
            (error) => {
                console.log('Error send message:', error);
            }
        );
    }

    setChatUI() {
        const screenWidth = window.innerWidth;
        if (screenWidth < 760 && !this.isChatItemClicked) {
            this.isChatSectionVisible = false;
            this.isChatMenuVisible = true;
        } else if (screenWidth < 760 && this.isChatItemClicked) {
            this.isChatMenuVisible = false;
            this.isChatSectionVisible = true;
        } else if (screenWidth >= 760) {
            this.isLaptopScreen = true;
            this.isChatMenuVisible = true;
            this.isChatSectionVisible = true;
        }
    }

    selectChat(chatItem: ChatItem) {
        this.selectedChat = chatItem;
        this.clickedChat.emit(chatItem);

        // Call the API to fetch chat contacts
        this.chatAPI.getContacts().subscribe(
            (res: any) => {
                this.chatContacts = res?.contacts;
            },
            (error) => {
                console.log('Error fetching contacts:', error);
            }
        );
    }

    openSearch(chatItem: ChatItem) {
        this.clickedChat.emit(chatItem);
        this.chatContacts.unshift(chatItem);
        this.selectedChat = this.chatContacts[0];
        this.resultsAllSearch = [];
        this.searchValue = ''; // Clear the input field value
    }

    callSeacrhAPI(event: any) {
        const searchTerm = event.target.value;

        if (searchTerm === '') {
            // Clear the search results when the search term is empty
            this.resultsAllSearch = [];
        } else {
            this.searchAPI.searchUsers(searchTerm).subscribe((res: any) => {
                this.resultsAllSearch = res?.data?.data;
            });
        }
    }
}
