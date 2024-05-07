import { DOCUMENT } from '@angular/common';
import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatItem } from '../../models/chat-item';
import { ChatText } from '../../models/chat-text';
import { ChatService } from '../../services/chat.service';
import { PusherService } from '../../services/pusher.service';

@Component({
    selector: 'app-chat-section',
    templateUrl: './chat-section.component.html',
    styleUrls: ['./chat-section.component.scss'],
})
export class ChatSectionComponent implements AfterViewInit {
    @Output() goBack = new EventEmitter<any>();

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private chatAPI: ChatService,
        private route: ActivatedRoute,
        private pusherService: PusherService
    ) {}

    id: any;
    channel: any;
    message: any;
    user_id: number;
    msgInut: string;
    msg: string = '';
    chatRecords: ChatText[] = [];
    chatContacts: any[] = [];
    chatMessages: any[] = [];
    isMyMsg: boolean = false;
    @Input() chatItem: ChatItem;
    @ViewChild('chatSection', { static: false })
    private chatSection: ElementRef;

    ngOnInit() {
        this.user_id = +localStorage.getItem('user-id');
        this.chatAPI.fetchMessage(1).subscribe(
            (res: any) => {
                this.chatRecords = res?.messages;
            },
            (error) => {
                console.log('Error fetch message:', error);
            }
        );

        this.channel = this.pusherService.pusher.subscribe(
            `private-chatify.${this.user_id}`
        );

        this.channel.bind('messaging', (data) => {
            let newMessage: any = {
                ...data.message,
                created_at: this.timeConverter(data.message.created_at),
            };
            newMessage.body = newMessage.message;
            if (this.chatItem.id === newMessage.from_id) {
                this.chatRecords.push(newMessage);
                setTimeout(() => {
                    this.scrollToBottom();
                });
            }
        });
        setTimeout(() => {
            this.scrollToBottom();
        });
    }

    ngOnChanges() {
        this.user_id = +localStorage.getItem('user-id');
        this.chatAPI.fetchMessage(this.chatItem?.id).subscribe(
            (res: any) => {
                this.chatRecords = res?.messages.map((message: any) => {
                    const updatedMessage = { ...message };
                    updatedMessage.message = updatedMessage.body;
                    return updatedMessage;
                });
                this.chatRecords.reverse();
            },
            (error) => {
                console.log('Error fetch message:', error);
            }
        );

        if (this.chatItem?.id) {
            this.setMsgInputBox();
        }
        setTimeout(() => {
            this.scrollToBottom();
        }, 1000);
    }

    scrollToBottom(): void {
        try {
            const chatSection = this.chatSection.nativeElement;
            const lastMessage = chatSection.lastElementChild;

            if (lastMessage) {
                lastMessage.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end',
                    inline: 'nearest',
                });
            }
        } catch (err) {}
    }

    ngAfterViewInit() {
        this.scrollToBottom();
    }

    setMsgInputBox() {
        const chatInput = document.getElementById(
            'chatInput'
        ) as HTMLTextAreaElement;

        chatInput.addEventListener('input', () => {
            chatInput.style.height = '40px';
            chatInput.style.height = `${chatInput.scrollHeight}px`; // Set the new height based on content
        });
    }

    sendMsg(event?: KeyboardEvent) {
        if (event) {
            event.preventDefault();
        }

        let chatText: ChatText = {} as ChatText;

        chatText.body = this.msgInut;
        this.chatAPI.sendMessage(this.chatItem.id, this.msgInut).subscribe(
            (res: any) => {
                const message = {
                    ...res.message,
                    created_at: this.timeConverter(res.message.created_at),
                };
                this.chatRecords.push(message);
                setTimeout(() => {
                    this.scrollToBottom();
                });
            },
            (error) => {
                console.log('Error fetch message:', error);
            }
        );
        this.msgInut = '';
    }

    formatTime(timestamp) {
        const currentDate = new Date();
        const messageDate = new Date(
            timestamp.endsWith('Z') ? timestamp : `${timestamp}Z`
        );

        const timeDiff = currentDate.getTime() - messageDate.getTime();
        const oneDay = 24 * 60 * 60 * 1000;
        const oneWeek = 7 * oneDay;
        const oneYear = 365 * oneDay;

        if (
            timeDiff < oneDay &&
            currentDate.getDate() === messageDate.getDate()
        ) {
            // Within the same day, format as [time]
            const hours = messageDate.getHours();
            const minutes = messageDate.getMinutes();
            const amPm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = String(
                hours % 12 === 0 ? 12 : hours % 12
            ).padStart(2, '0');
            const formattedMinutes = String(minutes).padStart(2, '0');
            return `${formattedHours}:${formattedMinutes} ${amPm}`;
        } else if (timeDiff < oneWeek) {
            // Within the past week, format as [day name] [time]
            const dayNames = [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
            ];
            const dayName = dayNames[messageDate.getDay()];
            const hours = messageDate.getHours();
            const minutes = messageDate.getMinutes();
            const amPm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = String(
                hours % 12 === 0 ? 12 : hours % 12
            ).padStart(2, '0');
            const formattedMinutes = String(minutes).padStart(2, '0');
            return `${dayName} ${formattedHours}:${formattedMinutes} ${amPm}`;
        } else if (timeDiff < oneYear) {
            // Within the past year, format as [MM/DD] [time]
            const month = String(messageDate.getMonth() + 1).padStart(2, '0');
            const day = String(messageDate.getDate()).padStart(2, '0');
            const hours = messageDate.getHours();
            const minutes = messageDate.getMinutes();
            const amPm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = String(
                hours % 12 === 0 ? 12 : hours % 12
            ).padStart(2, '0');
            const formattedMinutes = String(minutes).padStart(2, '0');
            return `${month}/${day} ${formattedHours}:${formattedMinutes} ${amPm}`;
        } else {
            // Over a year ago, format as [xy] [time]
            const yearsAgo = Math.floor(timeDiff / oneYear);
            const hours = messageDate.getHours();
            const minutes = messageDate.getMinutes();
            const amPm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = String(
                hours % 12 === 0 ? 12 : hours % 12
            ).padStart(2, '0');
            const formattedMinutes = String(minutes).padStart(2, '0');
            return `${yearsAgo}y ${formattedHours}:${formattedMinutes} ${amPm}`;
        }
    }

    timeConverter(timestamp1: string) {
        // Parse the first timestamp into a Date object
        const date1 = new Date(timestamp1);

        // Get the year, month, day, hours, minutes, seconds, and milliseconds
        const year = date1.getUTCFullYear();
        const month = date1.getUTCMonth() + 1; // Month is 0-indexed, so add 1
        const day = date1.getUTCDate();
        const hours = date1.getUTCHours();
        const minutes = date1.getUTCMinutes();
        const seconds = date1.getUTCSeconds();
        const milliseconds = date1.getUTCMilliseconds();

        // Format the date in ISO 8601 format with milliseconds and "Z" for UTC
        const timestamp2 = `${year}-${month.toString().padStart(2, '0')}-${day
            .toString()
            .padStart(2, '0')}T${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}.${milliseconds.toString().padStart(6, '0')}Z`;

        return timestamp2;
    }

    isSmallScreen(): boolean {
        return window.innerWidth < 760;
    }

    goToMenu() {
        this.goBack.emit(1);
    }
}
