const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader')

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const count = 3;
const apiKey = 'cwtoT22gOLUAWLbHu6TWNgxMux0Si8M4xJIRvnKQPmk';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }

}

// Вспомогательная функция для создания атрибутов для элементов
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {

        // Создаем ссылку на изображение
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blanc',
        })

        // Создаем элемент с изображением
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })

        img.addEventListener('load', imageLoaded)

        // Добавляем изображение во внутрь ссылки, что бы при нажатии на картинку, можно было перейти на сайт с этой картинкой, а затем добавляем целый элемент в контейнер для изображений
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

async function getPhotosFromUnsplashAPI() {
    try {
        const res = await fetch(apiUrl);
        photosArray = await res.json();
        displayPhotos();
    } catch (error) {

    }
}

// Загружаем больше фото если страница приближается к концу
window.addEventListener('scroll', ()=>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotosFromUnsplashAPI();
    }
})

// On load
getPhotosFromUnsplashAPI();