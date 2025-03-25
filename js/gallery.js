const stars = document.querySelectorAll('.star');
const feedbackTextarea = document.getElementById('feedback');
const submitButton = document.getElementById('submit-feedback');
const feedbackDisplay = document.getElementById('feedback-display');
const gallery = document.getElementById('image-gallery');
let currentRating = 0;

fetch('json/images.json')
    .then(response => response.json())
    .then(data => {
        data.images.forEach(image => {
            const img = document.createElement('img');
            img.src = image.url;
            img.alt = image.alt;
            gallery.appendChild(img);
        });
    });

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