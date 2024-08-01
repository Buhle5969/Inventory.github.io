document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    const productList = document.getElementById('productList');
    const searchInput = document.getElementById('search');
    const searchButton = document.getElementById('searchButton');
    
    // Initialize products from local storage
    let products = JSON.parse(localStorage.getItem('products')) || [];

    function displayProducts(filter = '') {
        productList.innerHTML = '';
        products
            .filter(product => product.name.toLowerCase().includes(filter.toLowerCase()))
            .forEach((product, index) => {
                const li = document.createElement('li');
                li.innerHTML = `${product.name} - ${product.quantity} 
                    <button onclick="removeProduct(${index})">Remove</button>`;
                productList.appendChild(li);
            });
    }

    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const productName = document.getElementById('productName').value.trim();
        const productQuantity = parseInt(document.getElementById('productQuantity').value);

        if (productName === '' || productQuantity <= 0) {
            alert('Please enter a valid product name and quantity.');
            return;
        }

        if (products.some(product => product.name === productName)) {
            alert('Product name must be unique.');
            return;
        }

        const product = {
            name: productName,
            quantity: productQuantity
        };

        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts();
        productForm.reset();
    });

    window.removeProduct = function(index) {
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts();
    };

    searchButton.addEventListener('click', () => {
        displayProducts(searchInput.value);
    });

    displayProducts();
});
