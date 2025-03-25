const stars = document.querySelectorAll('.star');
const feedbackTextarea = document.getElementById('feedback');
const submitButton = document.getElementById('submit-feedback');
const feedbackDisplay = document.getElementById('feedback-display');

let currentRating = 0;



const gallery = document.getElementById('gallery');
const popup = document.getElementById('galleryimagePopup');
const popupImages = document.getElementById('gallerypopupImages');
const overlay = document.getElementById('galleryoverlay');
const popupTitle = document.getElementById('gallerypopupTitle');

fetch('json/gallery.json')
    .then(response => response.json())
    .then(imageData => {
    
        const numCards = Math.min(4, imageData.length);

        for (let i = 0; i < numCards; i++) {
            const item = imageData[i];
            const card = document.createElement('div');
            card.classList.add('gallerycard');
            card.dataset.title = item.title;

            const cardImages = document.createElement('div');
            cardImages.classList.add('gallery-card-images');

            item.images.forEach((image, index) => {
                const img = document.createElement('img');
                img.src = image;
                img.style.position = 'absolute'; 
                if (index > 0) {
                    img.style.opacity = '0';
                }
                cardImages.appendChild(img);
            });

            const cardTitle = document.createElement('div');
            cardTitle.classList.add('gallery-card-title');
            cardTitle.textContent = item.title;
            cardTitle.style.color= "rgb(246, 118, 72)";
            cardTitle.style.fontWeight= "bold";
            card.appendChild(cardImages);
            card.appendChild(cardTitle);
            gallery.appendChild(card);

            card.addEventListener('click', () => {
                popupTitle.textContent = item.title;
                popupImages.innerHTML = '';

                item.images.forEach(image => {
                    const imgElement = document.createElement('img');
                    imgElement.src = image;
                    popupImages.appendChild(imgElement);
                });

                popup.style.display = 'block';
                overlay.style.display = 'block';
            });
        }
    });

function closeGalleryPopup() {
    popup.style.display = 'none';
    overlay.style.display = 'none';
}

// rating
stars.forEach(star => {
    star.addEventListener('click', function() {
        currentRating = parseInt(this.dataset.rating);
        stars.forEach(s => s.classList.remove('active'));
        for (let i = 0; i < currentRating; i++) {
            stars[i].classList.add('active');
        }
    });
});

submitButton.addEventListener('click', function() {
    const feedback = feedbackTextarea.value;
    if (feedback || currentRating > 0) {
        const feedbackDiv = document.createElement('div');
        feedbackDiv.innerHTML = `<strong>Rating:</strong> ${currentRating}, <strong>Feedback:</strong> ${feedback}`;
        feedbackDisplay.appendChild(feedbackDiv);
        feedbackTextarea.value = '';
        currentRating = 0;
        stars.forEach(s => s.classList.remove('active'));
    } else {
        alert("Please enter feedback or a rating.");
    }

});