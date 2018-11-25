export const addVideoNodes = (data) => {
    const results = document.getElementById('result-list');
    const temp = document.getElementById('videoNode').content;
    const fragment = new DocumentFragment();
    let tempFrag;
    data.items.forEach((item) => {
        tempFrag = temp.cloneNode(true);
        tempFrag.querySelector('.main__item_link').innerHTML = item.snippet.title;
        tempFrag.querySelector('.main__item_link').href = `https://www.youtube.com/watch?v=${item.id}`;
        tempFrag.querySelector('.main__item_description').innerHTML = `${item.snippet.description.substring(0, 150)}...`;
        tempFrag.querySelector('.main__item_author').innerHTML = item.snippet.channelTitle;
        tempFrag.querySelector('.main__item_date').innerHTML = item.snippet.publishedAt.slice(0, 10);
        tempFrag.querySelector('.main__item_img').src = item.snippet.thumbnails.medium.url;
        tempFrag.querySelector('.main__item_views').innerHTML = item.statistics.viewCount;
        fragment.appendChild(tempFrag);
    });
    results.appendChild(fragment);
};
