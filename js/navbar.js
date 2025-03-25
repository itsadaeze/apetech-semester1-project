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


// PRODUCT SECTION
async function fetchData() {
    const response = await fetch('json/product.json');
    const data = await response.json();
    return data;
}

async function loadPastries(navbarSelect, sectionSelect, targetProductId) {
    const pastryData = await fetchData();
    const cardContainer = document.getElementById(targetProductId);
    const popup = document.getElementById("popup");
    const popupTitle = document.getElementById("popupTitle");
    const popupImage = document.getElementById("popupImage");
    const popupDescription = document.getElementById("popupDescription");
    const overlay = document.getElementById("overlay");

    // Display default pastries on load
    displayPastries("pastries", pastryData);

    const changeFunction = function () {
        const selectedValue = this.value;
        if (selectedValue) {
            displayPastries(selectedValue, pastryData);
            // Scroll to the product section
            document.getElementById(targetProductId).scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (navbarSelect) {
        navbarSelect.addEventListener("change", changeFunction);
    }
    if(sectionSelect){
        sectionSelect.addEventListener("change", changeFunction);
    }

    function displayPastries(type, data) {
        cardContainer.innerHTML = "";
        data[type].forEach((item) => {
            const card = document.createElement("div");
            card.classList.add("card");

            const image = document.createElement("img");
            image.src = item.image;
            card.appendChild(image);
            const titleText = document.createElement("h4");
            titleText.textContent = item.title;
            titleText.style.color = "rgb(103, 102, 102)";
           
            card.appendChild(titleText)
            const seeMoreButton = document.createElement("button");
            seeMoreButton.textContent = "See More";
            seeMoreButton.style.backgroundColor= "rgb(246, 118, 72)";
            seeMoreButton.style.padding= "5px 60px";
            seeMoreButton.style.borderRadius= "5px 30px";
            seeMoreButton.style.border= "none";
            seeMoreButton.style.margin= "10px";
            seeMoreButton.style.color= "white";
            seeMoreButton.addEventListener("click", function () {
                popupTitle.textContent = item.title;
                popupImage.src = item.image;
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

loadPastries(document.getElementById("navbarPastrySelect"), document.getElementById("sectionPastrySelect"), "product");