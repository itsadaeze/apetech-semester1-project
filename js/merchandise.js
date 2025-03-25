fetch('json/merchandise.json')
.then(response => response.json())
.then(data => {
    const productGrid = document.getElementById('merchandiseProductGrid');
    data.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('merchandise-product');
        productDiv.setAttribute('data-category', product.category);

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;

        const p = document.createElement('p');
        p.textContent = product.name;

        productDiv.appendChild(img);
        productDiv.appendChild(p);
        productGrid.appendChild(productDiv);
    });
    initializeMerchandise();
});

function initializeMerchandise() {
const productFilter = document.getElementById('merchandiseProductFilter');
const productGrid = document.getElementById('merchandiseProductGrid');
const products = Array.from(productGrid.children);

productFilter.addEventListener('change', () => {
    const filterValue = productFilter.value;

    products.forEach(product => {
        const category = product.dataset.category;
        if (filterValue === 'all' || filterValue === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});
}