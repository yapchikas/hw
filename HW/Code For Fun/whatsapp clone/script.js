/* use global $*/


// function sortMessagesByProximity(messages) {
//     /**
//      * Parses a time string in "H:MM AM/PM" or "HH:MM AM/PM" format to a Date object representing today's date at that time.
//      * @param {string} timeStr - The time string to parse.
//      * @returns {Date|null} - A Date object representing the time today, or null if the input is invalid.
//      */
//     function parseTimeToDate(timeStr) {
//         // Check if the input is a string
//         if (typeof timeStr !== 'string') return null;

//         // Trim whitespace and convert to uppercase to handle case-insensitive inputs (e.g., "am", "pm")
//         const trimmedStr = timeStr.trim().toUpperCase();

//         // Regular expression to match "H:MM AM/PM" or "HH:MM AM/PM"
//         const timeRegex = /^(\d{1,2}):(\d{2})\s?(AM|PM)$/;
//         const match = trimmedStr.match(timeRegex);

//         // If the time string doesn't match the expected format, return null
//         if (!match) return null;

//         // Destructure the matched groups: hours, minutes, and period (AM/PM)
//         let [_, hoursStr, minutesStr, period] = match;
//         let hours = parseInt(hoursStr, 10);
//         const minutes = parseInt(minutesStr, 10);

//         // Validate hours and minutes ranges
//         if (
//             isNaN(hours) || isNaN(minutes) ||
//             hours < 1 || hours > 12 ||
//             minutes < 0 || minutes > 59
//         ) {
//             return null;
//         }

//         // Convert to 24-hour format
//         if (period === 'AM') {
//             if (hours === 12) {
//                 hours = 0; // Midnight
//             }
//         } else if (period === 'PM') {
//             if (hours !== 12) {
//                 hours += 12; // Afternoon/evening
//             }
//         }

//         // Create a Date object for today with the parsed time
//         const now = new Date();
//         const messageDate = new Date(
//             now.getFullYear(),
//             now.getMonth(),
//             now.getDate(),
//             hours,
//             minutes,
//             0, // seconds
//             0  // milliseconds
//         );

//         return messageDate;
//     }

//     // Capture the current time once to ensure consistency during sorting
//     const now = new Date();

//     /**
//      * Calculate the absolute difference in milliseconds between two Date objects.
//      * @param {Date} date1 - The first Date object.
//      * @param {Date} date2 - The second Date object.
//      * @returns {number} - The absolute difference in milliseconds.
//      */
//     function getTimeDifference(date1, date2) {
//         return Math.abs(date1 - date2);
//     }

//     // Create a shallow copy of the messages array to avoid mutating the original array
//     const messagesCopy = [...messages];

//     // Sort the copied array based on the proximity of 'lastMessageTime' to the current time
//     messagesCopy.sort((a, b) => {
//         const timeA = parseTimeToDate(a.lastMessageTime);
//         const timeB = parseTimeToDate(b.lastMessageTime);

//         // Calculate the time differences
//         const diffA = timeA ? getTimeDifference(timeA, now) : Infinity;
//         const diffB = timeB ? getTimeDifference(timeB, now) : Infinity;

//         // Compare the differences to determine sort order
//         return diffA - diffB;
//     });

//     return messagesCopy;
// }

function sortMessagesByProximity(messages) {
    /**
     * Parses date and time strings into a Date object.
     * @param {string} dateStr - The date string to parse (e.g., "9/23/2024").
     * @param {string} timeStr - The time string to parse (e.g., "6:56 AM").
     * @returns {Date|null} - A Date object representing the combined date and time, or null if invalid.
     */
    function parseDateTimeToDate(dateStr, timeStr) {
        // Check if the inputs are strings
        if (typeof dateStr !== 'string' || typeof timeStr !== 'string') return null;

        // Trim whitespace
        const trimmedDateStr = dateStr.trim();
        const trimmedTimeStr = timeStr.trim().toUpperCase(); // Handle case-insensitive AM/PM

        // Validate and parse the date string (Format: M/D/YYYY)
        const dateParts = trimmedDateStr.split('/');
        if (dateParts.length !== 3) return null;
        const [monthStr, dayStr, yearStr] = dateParts;
        const year = parseInt(yearStr, 10);
        const month = parseInt(monthStr, 10) - 1; // JavaScript months are 0-based
        const day = parseInt(dayStr, 10);

        if (
            isNaN(year) || isNaN(month) || isNaN(day) ||
            year < 1000 || year > 9999 ||
            month < 0 || month > 11 ||
            day < 1 || day > 31
        ) {
            return null;
        }

        // Regular expression to match "H:MM AM/PM" or "HH:MM AM/PM"
        const timeRegex = /^(\d{1,2}):(\d{2})\s?(AM|PM)$/;
        const match = trimmedTimeStr.match(timeRegex);

        // If the time string doesn't match the expected format, return null
        if (!match) return null;

        // Destructure the matched groups: hours, minutes, and period (AM/PM)
        let [_, hoursStr, minutesStr, period] = match;
        let hours = parseInt(hoursStr, 10);
        const minutes = parseInt(minutesStr, 10);

        // Validate hours and minutes ranges
        if (
            isNaN(hours) || isNaN(minutes) ||
            hours < 1 || hours > 12 ||
            minutes < 0 || minutes > 59
        ) {
            return null;
        }

        // Convert to 24-hour format
        if (period === 'AM') {
            if (hours === 12) {
                hours = 0; // Midnight
            }
        } else if (period === 'PM') {
            if (hours !== 12) {
                hours += 12; // Afternoon/evening
            }
        }

        // Create a Date object with the parsed date and time
        const messageDate = new Date(year, month, day, hours, minutes, 0, 0);

        // Check if the date is valid
        if (isNaN(messageDate.getTime())) {
            return null;
        }

        return messageDate;
    }

    // Capture the current date and time once to ensure consistency during sorting
    const now = new Date();

    /**
     * Calculate the absolute difference in milliseconds between two Date objects.
     * @param {Date} date1 - The first Date object.
     * @param {Date} date2 - The second Date object.
     * @returns {number} - The absolute difference in milliseconds.
     */
    function getTimeDifference(date1, date2) {
        return Math.abs(date1 - date2);
    }

    // Create a shallow copy of the messages array to avoid mutating the original array
    const messagesCopy = [...messages];

    // Sort the copied array based on the proximity of 'lastMessageDate' and 'lastMessageTime' to the current date and time
    messagesCopy.sort((a, b) => {
        const dateTimeA = parseDateTimeToDate(a.lastMessageDate, a.lastMessageTime);
        const dateTimeB = parseDateTimeToDate(b.lastMessageDate, b.lastMessageTime);

        // Calculate the time differences
        const diffA = dateTimeA ? getTimeDifference(dateTimeA, now) : Infinity;
        const diffB = dateTimeB ? getTimeDifference(dateTimeB, now) : Infinity;

        // Compare the differences to determine sort order
        return diffA - diffB;
    });

    return messagesCopy;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////// MY CODE /////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let chatbox = $('.chatbox-input')
let header = $('#ourHeader2');
let chatContainer = $('.chat-container');
let chatID = '';
let oldID = '';
let messageArrays = [];
let notification = $('.notif-box')
let notifXMark = $('.fa-xmark')
let users = $('.fa-users');
let documentSelector = $('#document');
let userDropDown = $('#userDropdown')
let dropdown = false;
userDropDown.hide();
let currentUser = 'User';

chatContainer.css('background-image', 'url()');
chatContainer.css('background-color', '#e5ddd5')


users.click(() => {
    userDropDown.toggle();  // Show or hide the dropdown on each click
});

$(document).click((e) => {
    if (!userDropDown.is(e.target) && userDropDown.has(e.target).length === 0 && !users.is(e.target)) {
        userDropDown.hide();  // Hide dropdown if clicked outside
    }
});

userDropDown.change(function () {
    if ($(this).val() === 'User') {
        currentUser = 'User';
    }
    else if ($(this).val() === 'Friend') {
        currentUser = 'Friend';
    }
});

function exitNotifBox() {
    notification.hide();
}
function setChatColors() {
    if (chatID !== '') {
        let chatIDSelector = $(`#${chatID}`);
        chatIDSelector.css('background-color', '#dfe0dd');
        if (oldID !== '') {
            $(`#${oldID}`).css('background-color', '')
        }
    }
}
function prepareChat() {
    chatbox.show()
    chatContainer.css('background-image', '');
}
function openChat(e) {
    prepareChat()
    if (chatID !== `${e.first}-${e.last}`) {
        oldID = chatID;
        chatID = `${e.first}-${e.last}`;
        setChatColors();
        header.empty();
        header.append(`${e.first} ${e.last}<br><span>${e.status}</span>`);
        chatContainer.empty();
        chatContainer.append(`<div class="message-box friend-message"><p>${e.lastMessage}<br><span>${e.lastMessageTime}</span></p></div>`)
        loadMessages();
    }

}

function getDate() {
    let now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert 24-hour time to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12;  // If the hour is 0, change it to 12 (for midnight)

    // Add leading zeros to minutes and seconds if needed
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    let time = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    return time;
}
function todaysDate() {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11
    const day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();

    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
}

function addChat(message, time) {
    let hoursAndMinutes = time.slice(0, -6);
    let amOrPM = time.slice(-2);
    if (currentUser === 'User') {
        messageArrays.forEach(
            element => {
                if (element.ID === chatID) {
                    element.userMessages.push({ message: `${message}`, time: `${time}` });
                }
            });
        chatContainer.append(`<div class="message-box my-message"><p>${message}<br><span>${hoursAndMinutes} ${amOrPM}</span></p></div>`);
    }
    else if (currentUser === 'Friend') {
        messageArrays.forEach(
            element => {
                if (element.ID === chatID) {
                    element.friendMessages.push({ message: `${message}`, time: `${time}` });
                }
            });
        chatContainer.append(`<div class="message-box friend-message"><p>${message}<br><span>${hoursAndMinutes} ${amOrPM}</span></p></div>`);

    }
}

function sendMessage() {
    const inputBox = $('#input');

    // Attach event handler to the keypress event
    inputBox.on('keypress', function (e) {
        // Get the trimmed input value
        const inputValue = inputBox.val().trim();

        // Check if the key pressed is 'Enter' and the trimmed input is not empty
        if (e.key === 'Enter' && inputValue !== '') {
            addChat(inputValue, getDate()); // Use the trimmed input
            inputBox.val('');  // Clear the input box after sending the message
        }
    });
}


async function loadContacts() {
    let chatList = $('.chat-list')
    let contactsJSON = await fetch('contacts.json');
    let contacts = await contactsJSON.json();
    let sortedContacts = sortMessagesByProximity(contacts);
    sortedContacts.forEach(e => {
        if (e.lastMessageDate === todaysDate()) {
            chatList.append(` <div class="chat-box" id="${e.first}-${e.last}" data-first-name="${e.first}" data-last-name="${e.last}">
          <div class="img-box">
            <img class="img-cover" src="${e.profile}" alt="">
          </div>
          <div class="chat-details">
            <div class="text-head">
              <h4>${e.first} ${e.last}</h4>
              <p class="time">${e.lastMessageTime}</p>
            </div>
            <div class="text-message">
              <p>“${e.lastMessage}”</p>
            </div>
          </div>
        </div>`);
        }
        else {
            chatList.append(` <div class="chat-box" id="${e.first}-${e.last}" data-first-name="${e.first}" data-last-name="${e.last}">
                <div class="img-box">
                  <img class="img-cover" src="${e.profile}" alt="">
                </div>
                <div class="chat-details">
                  <div class="text-head">
                    <h4>${e.first} ${e.last}</h4>
                    <p class="time">${e.lastMessageDate}</p>
                  </div>
                  <div class="text-message">
                    <p>“${e.lastMessage}”</p>
                  </div>
                </div>
              </div>`);
        }
        $(`#${e.first}-${e.last}`).click(() => {
            openChat(e);
        });
        messageArrays.push({
            ID: `${e.first}-${e.last}`, userMessages: [], friendMessages: []
        });
    });

}


function loadMessages() {
    // Get the sorted messages
    let theMessages = sortTheMessages();
    // Iterate through the sorted messages and append them in the correct order
    theMessages.forEach(e => {
        let hoursAndMinutes = e.time.slice(0, -6);
        let amOrPM = e.time.slice(-2);

        if (e.type === 'user') {
            chatContainer.append(`<div class="message-box my-message"><p>${e.message}<br><span>${hoursAndMinutes} ${amOrPM}</span></p></div>`);
        } else if (e.type === 'friend') {
            chatContainer.append(`<div class="message-box friend-message"><p>${e.message}<br><span>${hoursAndMinutes} ${amOrPM}</span></p></div>`);
        }
    });
}

function sortTheMessages() {
    let orderedMessages;

    messageArrays.forEach(e => {
        if (e.ID === chatID) {
            orderedMessages = sortMessages(e.userMessages, e.friendMessages);
        }
    });

    return orderedMessages;
}

///////////////////////////////////////////////////////// CHATGPT ///////////////////////////////////////////////////////////////////

function sortMessages(userMessages, friendMessages) {
    // Merge the two message arrays with an identifier for each message source
    let combinedMessages = [
        ...userMessages.map(msgObj => ({ type: 'user', ...msgObj })),
        ...friendMessages.map(msgObj => ({ type: 'friend', ...msgObj }))
    ];

    // Parse time and sort by time from earliest to latest
    combinedMessages.sort((a, b) => {
        const timeA = parseTimeToDate(a.time);  // Extract time from message object
        const timeB = parseTimeToDate(b.time);  // Extract time from message object

        return timeA - timeB;  // Sort in ascending order of time (oldest first)
    });

    return combinedMessages;
}

// The helper function to parse time into a Date object
function parseTimeToDate(timeStr) {
    const trimmedStr = timeStr.trim().toUpperCase();
    const timeRegex = /^(\d{1,2}):(\d{2})(?::(\d{2}))?\s?(AM|PM)$/;
    const match = trimmedStr.match(timeRegex);

    if (!match) return null;

    let [_, hoursStr, minutesStr, secondsStr, period] = match;
    let hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);
    const seconds = secondsStr ? parseInt(secondsStr, 10) : 0;

    if (period === 'AM' && hours === 12) hours = 0;
    if (period === 'PM' && hours !== 12) hours += 12;

    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, seconds);
}



chatbox.hide();
notifXMark.click(exitNotifBox);
loadContacts();
sendMessage();
