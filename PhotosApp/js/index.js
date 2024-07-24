const UNSPLASH_ACCESS_KEY = 'eL8r2eVKAXndLcCc3Xs7xgfz_GRDdUtCq41DgfCeda0';
const API_URL = 'https://api.unsplash.com';
const PAGES = 12;

let currentPage = 1;
let currentQuery = '';

document.getElementById('search-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    currentQuery = document.getElementById('search-query').value;
    currentPage = 1;
    await fetchImages();
});

document.getElementById('prev-page').addEventListener('click', async () => {
    if (currentPage > 1) {
        currentPage--;
        await fetchImages();
    }
});

document.getElementById('next-page').addEventListener('click', async () => {
    currentPage++;
    await fetchImages();
});

async function fetchImages() {
    const endpoint = currentQuery
        ? `${API_URL}/search/photos?query=${currentQuery}&page=${currentPage}&per_page=${PAGES}&client_id=${UNSPLASH_ACCESS_KEY}`
        : `${API_URL}/photos?page=${currentPage}&per_page=${PAGES}&client_id=${UNSPLASH_ACCESS_KEY}`;

    try {
        const response = await fetch(endpoint);
        const data = await response.json();

        const images = currentQuery ? data.results : data;

        displayImages(images);
        updatePaginationInfo();
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

function displayImages(images) {
    const gallery = document.getElementById('image-gallery');
    gallery.innerHTML = '';

    images.forEach((image) => {
        const imgElement = document.createElement('img');
        imgElement.src = image.urls.small;
        imgElement.alt = image.alt_description || 'Unsplash Image';
        gallery.appendChild(imgElement);
    });
}

function updatePaginationInfo() {
    document.getElementById('page-info').textContent = `Page ${currentPage}`;
    document.getElementById('prev-page').disabled = currentPage === 1;
}

// Начальный запрос для отображения изображений
fetchImages();