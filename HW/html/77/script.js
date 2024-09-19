/*global $*/
async function loadVideos() {
    const videoData = await fetch('data.json')
    const videoArray = await videoData.json();
    videoArray.forEach(element => {

        $('.video-grid').append(`<div class="video-item"><div class="video-embed"><iframe src="${element.src}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div><div class="video-info"><img src="${element.profile}" alt="Channel Name" class="profile-pic"><div class="info-text"><h3>${element.title}</h3><p>${element.channelName}</p><p>${element.views} views • ${element.date} ago</p></div></div></div>`);

    });

}
loadVideos();