import data from './data.js';

const view = document.querySelector('.view'),
    viewWrapper = view.querySelector('.view_wrapper');
const navFilters = document.querySelectorAll('[data-filter]');
const isMobile = window.matchMedia('(max-width: 769px)');

const createHTML = () => {
    data.forEach((value) => {
        const getImages = () => {
            const imageSrc = value.images
                .map((image) => `<img class="view_info_media_image" src="${image}" alt="" />`)
                .join('');
            return imageSrc;
        };

        const html = `
            <div class="view_item" data-field="${value.field}">
                <div class="view_info">
                    <div class="view_info_text">
                        <span>${value.brand}</span>
                        <span>${value.catalog}</span>
                    </div>
                    <div class="view_info_media">
                        ${getImages()}
                    </div>
                </div>
                <div class="view_text">
                    <h1 class="view_text_brand">${value.brand}</h1>
                    <h1 class="view_text_title">${value.title}</h1>
                </div>
            </div>`;

        viewWrapper.insertAdjacentHTML('beforeend', html);

        if(isMobile.matches) return;
        getItems()
    });
};

const getItems = () => {
    const viewItems = viewWrapper.querySelectorAll('.view_item');

    viewItems.forEach((item) => {
        const text = item.querySelectorAll('.view_info_text'),
            media = item.querySelectorAll('.view_info_media_image');

        gsap.set([text, media], {display: 'none'});
        gsap.defaults({duration: 0.32, ease: 'none', stagger: 0.048});

        item.addEventListener('mouseenter', () => {
            gsap.to([text, media], {display: 'block', ovewrite: true});
        })
        item.addEventListener('mouseleave', () => {
            gsap.to([text, media], {display: 'none'});
        })
    })
};

navFilters.forEach((filter) => {
    filter.addEventListener('click', (event) => {
        const filterValue = event.target.dataset.filter;
        filterItems(filterValue);
    });
});

const filterItems = (filterValue) => {
    const viewItems = viewWrapper.querySelectorAll('.view_item');

    viewItems.forEach((item) => {
        const itemField = item.dataset.field;
        itemField === filterValue || filterValue === 'all'
            ? (item.style.display = 'flex')
            : (item.style.display = 'none');
    });

    navFilters.forEach((filter) => {
        const filterData = filter.dataset.filter;
        filterData === filterValue
            ? filter.classList.add('active')
            : filter.classList.remove('active');
    })
};

createHTML();