'use strict'

const userAvatar = $('#userAvatar');
const feed = $('#feed');

async function loadUser(user) {
    const userJSON = await fetch(`users/${user}.json`);
    const userData = await userJSON.json();

    userAvatar.attr('src', `${userData.avatar}`);
    renderTweets(userData.following);
}

async function renderTweets(following) {
    let allTweets = [];

    // Use Promise.all to wait for all fetch calls to resolve
    const fetchPromises = following.map(async (userFollowed) => {
        try {
            const userJSON = await fetch(`users/${userFollowed}.json`);

            if (!userJSON.ok) {
                throw new Error(`HTTP error! status: ${userJSON.status}`);
            }

            const userData = await userJSON.json();

            // Add the user's handle and avatar to each of their tweets, and push to allTweets array
            userData.tweets.forEach(tweet => {
                allTweets.push({
                    user: userData.handle,      // Include the user handle
                    avatar: userData.avatar,    // Include the user's avatar
                    ...tweet                    // Spread the rest of the tweet data
                });
            });

        } catch (e) {
            console.log(`${e.message}`);
        }
    });

    // Wait for all promises to resolve
    await Promise.all(fetchPromises);

    // Sort all tweets by date and time
    const sortedTweets = sortTweetsByDateAndTime(allTweets);

    console.log(sortedTweets);

    // Call the function to display the sorted tweets
    displayTweets(sortedTweets);
}


function sortTweetsByDateAndTime(tweets) {
    return tweets.sort((a, b) => {
        // Convert time and date into Date objects for sorting
        const dateA = new Date(`${a.date.trim()} ${a.time}`);
        const dateB = new Date(`${b.date.trim()} ${b.time}`);

        // Sort by most recent date first
        return dateB - dateA;
    });
}

function displayTweets(tweetsArray){
    feed.empty()
    tweetsArray.forEach(tweet => {
        feed.append(`
            <div class="feed-item">
                <img src="${tweet.avatar}" alt="${tweet.user}'s Avatar">
                <div class="feed-item-content">
                    <h4>${tweet.user} <span>@${tweet.user}</span></h4>
                    <p>${tweet.content}</p>
                    <div class="feed-item-actions">
                        <button class="like-button">
                            Like (${tweet.likes})
                        </button>
                        <button class="retweet-button">
                            Retweet (${tweet.retweets})
                        </button>
                        <button class="reply-button">
                            Reply (${tweet.replies.length})
                        </button>
                    </div>
                </div>
            </div>
        `);
    });

}
loadUser('thiefs');
