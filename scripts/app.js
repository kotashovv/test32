'use strict';


document.addEventListener('DOMContentLoaded', ()=>{

    let cuponBtn = document.querySelector('.open-cupon');

    if(cuponBtn) {
        cuponBtn.addEventListener('click', (e)=>{
            let cuponWindow = document.querySelector('.cupon');
            e.preventDefault();
            if (e.target.classList.contains('active')) {
                e.target.classList.remove('active');
                CloseCupon();
            } else {
                e.target.classList.add('active');
                OpenCupon();
            }
            function OpenCupon() {
                cuponWindow.classList.add("active");
                cuponWindow.style.maxHeight = 'max-content';
            }
            function CloseCupon() {
                cuponWindow.classList.remove("active");
                cuponWindow.style.maxHeight = '0';

            }
        })

       


    }

    let burgerBtn = document.querySelector('.burger-btn');
    if (burgerBtn) {
        let mobileMenu = document.querySelector('.mobile-menu');

        burgerBtn.addEventListener('click',(e)=>{
            if (!e.target.classList.contains("active")) {
                e.target.classList.add('active');
                mobileMenu.classList.add('active');
                mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
            } else {
                e.target.classList.remove('active');
                mobileMenu.classList.remove('active');
                mobileMenu.style.maxHeight = 0 + 'px';
            }
        })
    }

    new Swiper('.hero__slider',{
        speed: 700,
        autoplay: {
            delay: 5000,
          },
    })

    let searchBtn = document.querySelector('.btn-search');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', (e)=>{
            let serachform = document.querySelector('.header__search form');
            if (!serachform.classList.contains('active')){
                serachform.classList.add('active');
            } else {
                serachform.classList.remove('active');
            }     
        });
    };

    new Swiper('.gallery__slider',{
        loop: true,
        autoplay: {
            delay: 5000,
          },
        breakpoints: {
            1: {
                slidesPerView: 1.5,
                centeredSlides: true,
            },
            560: {
                slidesPerView: 2.5,
            },
            768: {
                slidesPerView: 3.5,
            },
            920: {
                slidesPerView: 4.5,
            },
            1023: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 5,
            },
        }
    });


    

    let productCount = document.querySelectorAll('.product-info__count');

    if (productCount.length != 0) {
        productCount.forEach(function(item){
            item.addEventListener('click', function(e){
                e.preventDefault();
                let productInfoNum = e.target.closest('.product-info__count').querySelector('.product-info-count-input');
                if (e.target.classList.contains('product-info-decrement')) {
                    let num = +productInfoNum.value - 1 ;
                    if (num<1) {
                        num = 1;
                    } 
                    productInfoNum.value = num;
                } else if (e.target.classList.contains('product-info-increment')) {
                    let num = +productInfoNum.value + 1 ;
                    productInfoNum.value = num;
                }
            })
        })
    }

    var preview = new Swiper(".product__preview", {
        spaceBetween: 10,
        slidesPerView: 3,
        freeMode: true,
        watchSlidesProgress: true,
        breakpoints: {
            0: {
                direction: 'horizontal',
            },
            920: {
                direction: 'vertical',
            }
        }
      });
      var swiper2 = new Swiper(".product__slider", {
        spaceBetween: 10,
        slidesPerView: 1,
        thumbs: {
          swiper: preview,
        },
      });

    // let previewImg = document.querySelectorAll('.product__preview-item img');

    // if (previewImg.length != 0){
    //     for(let i = 0; i < previewImg.length; i++) {
    //         previewImg[i].addEventListener('mouseover', (e)=>{
    //             let prevActive = document.querySelector('.product__preview-item.active')
    //             prevActive.classList.remove('active')
    //             let parent = e.target.closest('.product__preview-item');
    //             parent.classList.add('active');

    //             let imgList = document.querySelectorAll('.product__slider .item');
    //             imgList.forEach(function(item){
    //                 item.classList.remove('active');
    //             })
    //             imgList[i].classList.add('active');
    //         })
    //     }
    // }


    function DynamicAdapt(type) {
        this.type = type;
    }
    
    DynamicAdapt.prototype.init = function () {
        const _this = this;
        // массив объектов
        this.оbjects = [];
        this.daClassname = "_dynamic_adapt_";
        // массив DOM-элементов
        this.nodes = document.querySelectorAll("[data-da]");
    
        // наполнение оbjects объктами
        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            const data = node.dataset.da.trim();
            const dataArray = data.split(",");
            const оbject = {};
            оbject.element = node;
            оbject.parent = node.parentNode;
            оbject.destination = document.querySelector(dataArray[0].trim());
            оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
            оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.оbjects.push(оbject);
        }
    
        this.arraySort(this.оbjects);
    
        // массив уникальных медиа-запросов
        this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
            return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
        }, this);
        this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
            return Array.prototype.indexOf.call(self, item) === index;
        });
    
        // навешивание слушателя на медиа-запрос
        // и вызов обработчика при первом запуске
        for (let i = 0; i < this.mediaQueries.length; i++) {
            const media = this.mediaQueries[i];
            const mediaSplit = String.prototype.split.call(media, ',');
            const matchMedia = window.matchMedia(mediaSplit[0]);
            const mediaBreakpoint = mediaSplit[1];
    
            // массив объектов с подходящим брейкпоинтом
            const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
                return item.breakpoint === mediaBreakpoint;
            });
            matchMedia.addListener(function () {
                _this.mediaHandler(matchMedia, оbjectsFilter);
            });
            this.mediaHandler(matchMedia, оbjectsFilter);
        }
    };
    
    DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
        if (matchMedia.matches) {
            for (let i = 0; i < оbjects.length; i++) {
                const оbject = оbjects[i];
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.moveTo(оbject.place, оbject.element, оbject.destination);
            }
        } else {
            for (let i = 0; i < оbjects.length; i++) {
                const оbject = оbjects[i];
                if (оbject.element.classList.contains(this.daClassname)) {
                    this.moveBack(оbject.parent, оbject.element, оbject.index);
                }
            }
        }
    };
    
    // Функция перемещения
    DynamicAdapt.prototype.moveTo = function (place, element, destination) {
        element.classList.add(this.daClassname);
        if (place === 'last' || place >= destination.children.length) {
            destination.insertAdjacentElement('beforeend', element);
            return;
        }
        if (place === 'first') {
            destination.insertAdjacentElement('afterbegin', element);
            return;
        }
        destination.children[place].insertAdjacentElement('beforebegin', element);
    }
    
    // Функция возврата
    DynamicAdapt.prototype.moveBack = function (parent, element, index) {
        element.classList.remove(this.daClassname);
        if (parent.children[index] !== undefined) {
            parent.children[index].insertAdjacentElement('beforebegin', element);
        } else {
            parent.insertAdjacentElement('beforeend', element);
        }
    }
    
    // Функция получения индекса внутри родителя
    DynamicAdapt.prototype.indexInParent = function (parent, element) {
        const array = Array.prototype.slice.call(parent.children);
        return Array.prototype.indexOf.call(array, element);
    };
    
    // Функция сортировки массива по breakpoint и place 
    // по возрастанию для this.type = min
    // по убыванию для this.type = max
    DynamicAdapt.prototype.arraySort = function (arr) {
        if (this.type === "min") {
            Array.prototype.sort.call(arr, function (a, b) {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) {
                        return 0;
                    }
    
                    if (a.place === "first" || b.place === "last") {
                        return -1;
                    }
    
                    if (a.place === "last" || b.place === "first") {
                        return 1;
                    }
    
                    return a.place - b.place;
                }
    
                return a.breakpoint - b.breakpoint;
            });
        } else {
            Array.prototype.sort.call(arr, function (a, b) {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) {
                        return 0;
                    }
    
                    if (a.place === "first" || b.place === "last") {
                        return 1;
                    }
    
                    if (a.place === "last" || b.place === "first") {
                        return -1;
                    }
    
                    return b.place - a.place;
                }
    
                return b.breakpoint - a.breakpoint;
            });
            return;
        }
    };
    
    const da = new DynamicAdapt("max");
    da.init();
    

})