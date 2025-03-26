// const filterButtons = document.querySelectorAll('.merchandise-filter-btn');
// const cardsContainer = document.querySelector('.merchandise-cards');

// // Apply flex direction row to the cards container
// cardsContainer.style.display = 'flex';
// cardsContainer.style.flexWrap = 'wrap';
// cardsContainer.style.gap = '20px';

// fetch('json/merchandise.json')
//     .then(response => response.json())
//     .then(data => {
//         // Generate cards from JSON data
//         data.forEach(item => {
//             const card = document.createElement('div');
//             card.classList.add('merchandise-card');
//             card.dataset.category = item.category;

//             // Apply inline styles to the card
//             card.style.display = 'flex';
//             card.style.flexDirection = 'column';
//             card.style.margin = '10px';
//             card.style.width = '250px';

//             const img = document.createElement('img');
//             img.src = item.image;
//             img.alt = item.title;
//             img.style.width = '100%';
//             img.style.height = '200px';
//             img.style.objectFit = 'cover';

//             const title = document.createElement('p');
//             title.textContent = item.title;

//             card.appendChild(img);
//             card.appendChild(title);
//             cardsContainer.appendChild(card);
//         });

//         // Filter functionality
//         filterButtons.forEach(button => {
//             button.addEventListener('click', () => {
//                 const filter = button.dataset.filter;

//                 filterButtons.forEach(btn => btn.classList.remove('active'));
//                 button.classList.add('active');

//                 const merchandiseCards = document.querySelectorAll('.merchandise-card'); // Re-select cards

//                 console.log("Filter button clicked:", filter);
//                 console.log("Number of merchandise cards:", merchandiseCards.length);

//                 merchandiseCards.forEach(card => {
//                     console.log("Card category:", card.dataset.category);
//                     if (filter === 'all' || card.dataset.category === filter) {
//                         card.style.display = 'flex';
//                         console.log("Card shown:", card);
//                     } else {
//                         card.style.display = 'none';
//                         console.log("Card hidden:", card);
//                     }
//                 });
//             });
//         });
//     })
//     .catch(error => console.error('Error fetching merchandise data:', error));



// Here's the updated JavaScript code with mobile responsiveness for `cardsContainer` and `cardContainer`:


const filterButtons = document.querySelectorAll('.merchandise-filter-btn');
const cardsContainer = document.querySelector('.merchandise-cards');

// Apply flex direction row to the cards container
cardsContainer.style.display = 'flex';
cardsContainer.style.flexWrap = 'wrap';
cardsContainer.style.gap = '20px';

fetch('json/merchandise.json')
  .then(response => response.json())
  .then(data => {
    // Generate cards from JSON data
    data.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('merchandise-card');
      card.dataset.category = item.category;

      // Apply inline styles to the card
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      card.style.margin = '10px';
      card.style.width = '250px';

      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.title;
      img.style.width = '100%';
      img.style.height = '200px';
      img.style.objectFit = 'cover';

      const title = document.createElement('p');
      title.textContent = item.title;

      card.appendChild(img);
      card.appendChild(title);
      cardsContainer.appendChild(card);
    });

    // Filter functionality
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const merchandiseCards = document.querySelectorAll('.merchandise-card');
        merchandiseCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // Responsive design
    window.addEventListener('resize', function() {
      const width = window.innerWidth;
      if (width < 768) {
        // Adjust layout for mobile view
        cardsContainer.style.flexDirection = 'row';
        cardsContainer.style.overflowX = 'auto';
     
        const cardContainers = document.querySelectorAll('.merchandise-card');
        cardContainers.forEach(card => {
          card.style.width = '100%';
          card.style.margin = '10px 0';
          
        });
      } else {
        // Adjust layout for desktop view
        cardsContainer.style.flexDirection = 'row';
        const cardContainers = document.querySelectorAll('.merchandise-card');
        cardContainers.forEach(card => {
          card.style.width = '250px';
          card.style.margin = '10px';
        });
      }
    });
  })
  .catch(error => console.error('Error fetching merchandise data:', error));
