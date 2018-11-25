import * as apiLoder from './apiLoder';

export default {
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
                apiLoder.getVideos(...args);
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
};
