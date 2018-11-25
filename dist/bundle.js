/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__videoNode__ = __webpack_require__(3);


let nextPageToken = null;

const getVideos = (searchValue = null, itemsCount = null, apiCode = null) => {
    let url = '';
    function getVideoInfo(ids) {
        url = `https://www.googleapis.com/youtube/v3/videos?key=${apiCode}&part=snippet,statistics&id=`;
        for (let i = 0; i < ids.length; i += 1) {
            url += `${ids[i]},`;
        }
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                __WEBPACK_IMPORTED_MODULE_0__videoNode__["a" /* addVideoNodes */](data);
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
/* harmony export (immutable) */ __webpack_exports__["a"] = getVideos;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apiLoder__ = __webpack_require__(0);


/* harmony default export */ __webpack_exports__["a"] = ({
    settingsStart: (itemsCount, ...args) => {
        const results = document.getElementById('result-list');
        const settings = {
            interface: (data) => {
                settings.data = data || {};
                settings.itemsCount = data.itemsCount;
                settings.pageWidth = settings.getPageWidth();
                settings.itemsPerPage = Math.round(settings.pageWidth / 360);
                settings.size = Math.ceil(settings.itemsCount / settings.itemsPerPage);
                settings.resultsWidth = settings.size * settings.pageWidth;
                settings.setResultsWidth(settings.resultsWidth);
                settings.page = settings.data.page;
                settings.moveItems(settings.page);
            },
            moveItems: (page) => {
                const translateValue = (settings.pageWidth * (page - 1)).toString();
                document.getElementById('result-list').style.transform = `translateX(-${translateValue}px)`;
            },
            getPageWidth: () => document.getElementsByClassName('main__wrapper')[0].offsetWidth,
            setResultsWidth: (width) => {
                document.getElementById('result-list').style.width = `${width}px`;
            },
            getMoreItems: () => {
                __WEBPACK_IMPORTED_MODULE_0__apiLoder__["a" /* getVideos */](...args);
                settings.interface({
                    itemsCount: settings.itemsCount + itemsCount,
                    page: settings.page,
                });
            },
            onResize: () => {
                window.addEventListener('resize', () => {
                    settings.interface({
                        itemsCount: settings.itemsCount,
                        page: settings.page,
                    });
                    if (settings.page > settings.size) {
                        settings.page = settings.size;
                    }
                    settings.moveItems(settings.page);
                }, false);
            },
            onSwipe: () => {
                const xDown = null;
                const xUp = null;
                settings.onTouchSwipe(xDown, xUp);
                settings.onMouseSwipe(xDown, xUp);
            },
            onTouchSwipe: (xDown, xUp) => {
                results.addEventListener('touchstart', (e) => {
                    xDown = e.touches[0].clientX;
                });
                results.addEventListener('touchmove', (e) => {
                    if (!xDown) {
                        return;
                    }
                    xUp = e.touches[0].clientX;
                });
                results.addEventListener('touchend', () => {
                    if (!xDown || !xUp) {
                        return;
                    }
                    const xDiff = xDown - xUp;
                    if (xDiff > 0) {
                        settings.next();
                    } else {
                        settings.prev();
                    }
                });
            },
            onMouseSwipe: (xDown, xUp) => {
                results.addEventListener('mousedown', (e) => {
                    xDown = e.clientX;
                });
                results.addEventListener('mousemove', (e) => {
                    if (!xDown) {
                        return;
                    }
                    xUp = e.clientX;
                });
                results.addEventListener('mouseup', () => {
                    if (!xDown || !xUp) {
                        return;
                    }
                    const xDiff = xDown - xUp;
                    if (xDiff > 0) {
                        settings.next();
                    } else {
                        settings.prev();
                    }
                });
            },
            setPage: (page) => {
                const controll = document.getElementsByClassName('pageController');
                controll[1].innerHTML = page;
            },
            prev: () => {
                settings.page -= 1;
                if (settings.page < 1) {
                    settings.page = 1;
                }
                settings.moveItems(settings.page);
                settings.setPage(settings.page);
            },
            next: () => {
                settings.page += 1;
                settings.setPage(settings.page);
                if (settings.page > settings.size) {
                    settings.moveItems(settings.page);
                    settings.getMoreItems();
                } else {
                    settings.moveItems(settings.page);
                }
            },
            controlls: () => {
                const controll = document.getElementsByClassName('pageController');
                controll[0].addEventListener('click', settings.prev, false);
                controll[2].addEventListener('click', settings.next, false);
            },
            create: () => {
                settings.controlls();
                settings.onResize();
                settings.onSwipe();
            },
            init: (data) => {
                settings.interface(data);
                settings.create();
            },
        };
        return settings.init({
            itemsCount,
            page: 1,
        });
    },
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_apiLoder__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_settings__ = __webpack_require__(1);



const searchButton = document.getElementById('search_button');
const searchField = document.getElementById('search_field');
const controlls = document.getElementById('temp_controls').content;
const itemsCount = 12;
const apiCode = 'AIzaSyCCXDIVUSpoxFGLOAK3jx9iANFtCHb5PG0';

const listener = () => {
    document.getElementById('result-list').innerHTML = '';
    __WEBPACK_IMPORTED_MODULE_0__js_apiLoder__["a" /* getVideos */](searchField.value, itemsCount, apiCode);
    document.querySelector('.footer').appendChild(controlls);
    __WEBPACK_IMPORTED_MODULE_1__js_settings__["a" /* default */].settingsStart(itemsCount, searchField.value, itemsCount, apiCode);
};
searchButton.addEventListener('click', listener);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const addVideoNodes = (data) => {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = addVideoNodes;



/***/ })
/******/ ]);