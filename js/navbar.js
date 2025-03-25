// NAVBAR SECTION
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const burger = document.querySelector('.burger');
    const close = document.querySelector('.close');

    if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        navLinks.classList.add('inactive');
        setTimeout(() => {
            navLinks.style.display = 'none';
            navLinks.classList.remove('inactive');
        }, 500);

        burger.style.display = 'block';
        close.style.display = 'none';

    } else {
        navLinks.style.display = 'flex';
        navLinks.classList.add('active');
        burger.style.display = 'none';
        close.style.display = 'block';
    }
}
async function fetchData() {
    const response = await fetch('json/pastryData.json');
    const data = await response.json();
    return data;
}

async function loadPastries(){
    const pastryData = await fetchData();
    const pastrySelect = document.getElementById("pastrySelect");
    const cardContainer = document.getElementById("product");
    const popup = document.getElementById("popup");
    const popupDescription = document.getElementById("popupDescription");
    const overlay = document.getElementById("overlay");

    // Display default pastries on load
    displayPastries("pastries", pastryData);

    if(pastrySelect){
        pastrySelect.addEventListener("change", function () {
            const selectedValue = this.value;
            if (selectedValue) {
                displayPastries(selectedValue, pastryData);
                // Scroll to the product section
                document.getElementById("product").scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    function displayPastries(type, data) {
        cardContainer.innerHTML = "";
        data[type].forEach((item) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.style.borderRadius= "20px";
            card.style.width= "250px";
            card.style.boxShadow= "10px 10px 10px 10px rgba(0, 0, 0, 0.3)";

            const image = document.createElement("img");
            image.src = item.image;
            image.style.width = "250px";
            image.style.height = "350px";
            image.style.borderRadius = "20px";
            card.appendChild(image);

            const seeMoreButton = document.createElement("button");
            seeMoreButton.textContent = "See More";
            seeMoreButton.addEventListener("click", function () {
                const image = document.createElement("img");
                image.src = item.image;
                popupDescription.textContent = item.description;
                
                popup.style.display = "block";
                overlay.style.display = "block";
            });
            card.appendChild(seeMoreButton);

            cardContainer.appendChild(card);
        });
    }
}

// Moved closePopup() to the global scope
function closePopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

loadPastries();
