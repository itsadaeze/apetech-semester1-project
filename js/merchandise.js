document.addEventListener('DOMContentLoaded', () => {
    fetch('json/merchandise.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const productGrid = document.getElementById('merchandiseProductGrid');
            data.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('merchandise-product');
                productDiv.setAttribute('data-category', product.category);

                const img = document.createElement('img');
                img.src = product.image;
                img.alt = product.name;

                img.onerror = function(){
                    console.error("error loading image", img.src);
                }

                const p = document.createElement('p');
                p.textContent = product.name;

                productDiv.appendChild(img);
                productDiv.appendChild(p);
                productGrid.appendChild(productDiv);
            });
            initializeMerchandise();
        })
        .catch(error => {
            console.error('Error loading merchandise data:', error);
        });

    function initializeMerchandise() {
        const filters = document.querySelectorAll('.merchandise-filters button');
        const productGrid = document.getElementById('merchandiseProductGrid');
        const products = Array.from(productGrid.children);

        filters.forEach(filter => {
            filter.addEventListener('click', () => {
                const filterValue = filter.dataset.filter;

                products.forEach(product => {
                    const category = product.dataset.category;
                    if (filterValue === 'all' || filterValue === category) {
                        product.style.display = 'block';
                    } else {
                        product.style.display = 'none';
                    }
                });
            });
        });
    }
});