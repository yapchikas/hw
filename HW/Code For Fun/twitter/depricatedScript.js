const feed = document.getElementById('feed');
const tweetButton = document.getElementById('tweet-button');
const tweetInput = document.getElementById('tweet-input');

const samplePosts = [
    {
        username: 'Jane Smith',
        handle: '@janesmith',
        avatar: 'user1-avatar.jpg',
        content: 'Just enjoying a sunny day in the park!',
        likes: 5,
        retweets: 2,
        replies: 1,
        liked: false,
        retweeted: false
    },
    {
        username: 'Mike Johnson',
        handle: '@mikejohnson',
        avatar: 'user2-avatar.jpg',
        content: 'Can’t wait for the concert tonight!',
        likes: 10,
        retweets: 3,
        replies: 2,
        liked: false,
        retweeted: false
    }
];

function renderPosts() {
    feed.innerHTML = '';
    samplePosts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.classList.add('feed-item');
        postElement.innerHTML = `
            <img src="${post.avatar}" alt="User Avatar">
            <div class="feed-item-content">
                <h4>${post.username} <span>${post.handle}</span></h4>
                <p>${post.content}</p>
                <div class="feed-item-actions">
                    <button class="like-button ${post.liked ? 'liked' : ''}" data-index="${index}">
                        ${post.liked ? 'Unlike' : 'Like'} (${post.likes})
                    </button>
                    <button class="retweet-button ${post.boolean ? 'retweeted' : ''}" data-index="${index}">
                        ${post.retweeted ? 'Undo Retweet' : 'Retweet'} (${post.retweets})
                    </button>
                    <button class="reply-button" data-index="${index}">Reply (${post.replies})</button>
                </div>
            </div>
        `;
        feed.appendChild(postElement);
    });
}

tweetButton.addEventListener('click', () => {
    const content = tweetInput.value.trim();
    if (content !== '') {
        const newPost = {
            username: 'John Doe',
            handle: '@johndoe',
            avatar: 'user-avatar.jpg',
            content: content,
            likes: 0,
            retweets: 0,
            replies: 0,
            liked: false,
            retweeted: false
        };
        samplePosts.unshift(newPost);
        renderPosts();
        tweetInput.value = '';
    }
});

feed.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const index = e.target.getAttribute('data-index');
        if (e.target.classList.contains('like-button')) {
            if (samplePosts[index].liked) {
                samplePosts[index].likes--;
                samplePosts[index].liked = false;
            } else {
                samplePosts[index].likes++;
                samplePosts[index].liked = true;
            }
        } else if (e.target.classList.contains('retweet-button')) {
            if (samplePosts[index].retweeted) {
                samplePosts[index].retweets--;
                samplePosts[index].retweeted = false;
            } else {
                samplePosts[index].retweets++;
                samplePosts[index].retweeted = true;
            }
        } else if (e.target.classList.contains('reply-button')) {
            // Placeholder for reply functionality
            alert('Reply functionality is not implemented yet.');
        }
        renderPosts();
    }
});

renderPosts();
