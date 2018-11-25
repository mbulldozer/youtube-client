import * as apiLoder from './js/apiLoder';
import settings from './js/settings';

const searchButton = document.getElementById('search_button');
const searchField = document.getElementById('search_field');
const controlls = document.getElementById('temp_controls').content;
const itemsCount = 12;
const apiCode = 'AIzaSyCCXDIVUSpoxFGLOAK3jx9iANFtCHb5PG0';

const listener = () => {
    document.getElementById('result-list').innerHTML = '';
    apiLoder.getVideos(searchField.value, itemsCount, apiCode);
    document.querySelector('.footer').appendChild(controlls);
    settings.settingsStart(itemsCount, searchField.value, itemsCount, apiCode);
};
searchButton.addEventListener('click', listener);
