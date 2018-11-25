import * as videoNode from './videoNode';

let nextPageToken = null;

export const getVideos = (searchValue = null, itemsCount = null, apiCode = null) => {
    let url = '';
    function getVideoInfo(ids) {
        url = `https://www.googleapis.com/youtube/v3/videos?key=${apiCode}&part=snippet,statistics&id=`;
        for (let i = 0; i < ids.length; i += 1) {
            url += `${ids[i]},`;
        }
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                videoNode.addVideoNodes(data);
            });
    }
    function search() {
        url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${itemsCount}&alt=json&key=${apiCode}&q=${searchValue}`;
        if (nextPageToken) {
            url += `&pageToken=${nextPageToken}`;
        }
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                const ids = [];
                for (let i = 0; i < itemsCount; i += 1) {
                    ids.push(data.items[i].id.videoId);
                }
                nextPageToken = data.nextPageToken;
                getVideoInfo(ids);
            });
    }
    search();
};
