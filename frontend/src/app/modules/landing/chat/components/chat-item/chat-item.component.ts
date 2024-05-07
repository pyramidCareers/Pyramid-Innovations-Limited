import { Component, Input } from '@angular/core';
import { ChatItem } from '../../models/chat-item';

@Component({
    selector: 'app-chat-item',
    templateUrl: './chat-item.component.html',
    styleUrls: ['./chat-item.component.scss'],
})
export class ChatItemComponent {
    @Input() chat: ChatItem;

    formatTime(timestamp: string): string {
        const currentDate = new Date();
        // const messageDate = new Date(timestamp);
        const messageDate = new Date(
            timestamp.endsWith('Z') ? timestamp : `${timestamp}Z`
        );

        const timeDiff = currentDate.getTime() - messageDate.getTime();
        const oneDay = 24 * 60 * 60 * 1000;
        const oneWeek = 7 * oneDay;
        const oneYear = 365 * oneDay;

        if (currentDate.getDate() === messageDate.getDate()) {
            // Same day, format as hh:mm AM/PM
            const hours = messageDate.getHours();
            const minutes = messageDate.getMinutes();
            const amPm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = String(
                hours % 12 === 0 ? 12 : hours % 12
            ).padStart(2, '0');
            const formattedMinutes = String(minutes).padStart(2, '0');
            return `${formattedHours}:${formattedMinutes} ${amPm}`;
        } else if (timeDiff < oneWeek) {
            // Within the past week, format as MM/DD
            const month = String(messageDate.getMonth() + 1).padStart(2, '0');
            const day = String(messageDate.getDate()).padStart(2, '0');
            return `${month}/${day}`;
        } else if (timeDiff < oneYear) {
            // Within the past year, format as xw (x weeks ago)
            const weeksAgo = Math.floor(timeDiff / oneWeek);
            return `${weeksAgo}w`;
        } else {
            // Over a year ago, format as xy (x years ago)
            const yearsAgo = Math.floor(timeDiff / oneYear);
            return `${yearsAgo}y`;
        }
    }
}
