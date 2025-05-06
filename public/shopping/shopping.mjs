const PRODUCTS = [ // Imagine this data came in via the server
    {
        name: "Elder Chocolate Truffles, 2oz",
        description: "The best of the best in chocolate truffles.",
        imageSrc: "https://placehold.co/200x200",
        price: 10,
        numInCart: 2
    },
    {
        name: "Jelly Belly Jelly Beans, 100 count",
        description: "Not for planting.",
        imageSrc: "https://placehold.co/200x200",
        price: 5,
        numInCart: 1
    },
    {
        name: "Kettle Chips, 8oz",
        description: "Delicious and unhealthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 3,
        numInCart: 0
    },
    {
        name: "Carrots, 2lb",
        description: "Delicious and healthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 2,
        numInCart: 0
    }
];

/**
 * Turns a product data object into HTML.
 *
 * @param product product data
 * @return {HTMLElement} HTML element representing the product data
 */
function renderProductCard(product) {
    const article = document.createElement('article');

    const img = document.createElement('img');
    img.src = product.imageSrc;
    img.alt = product.name;

    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'product-details';

    const name = document.createElement('h3');
    name.textContent = product.name;

    const desc = document.createElement('p');
    desc.textContent = product.description;

    const price = document.createElement('p');
    price.className = 'price';
    price.textContent = `$${product.price}`;

    const cartDiv = document.createElement('div');
    const button = document.createElement('button');
    button.className = 'buy-button';
    button.textContent = 'Add to cart';
    button.addEventListener('click', () => {
        product.numInCart++;
        rerenderAllProducts();
        rerenderCart();
    });

    cartDiv.appendChild(button);

    if (product.numInCart > 0) {
        const cartCount = document.createElement('span');
        cartCount.className = 'num-in-cart';
        cartCount.textContent = `${product.numInCart} in cart`;
        cartDiv.appendChild(document.createTextNode(' '));
        cartDiv.appendChild(cartCount);
    }

    detailsDiv.appendChild(name);
    detailsDiv.appendChild(desc);
    detailsDiv.appendChild(price);
    detailsDiv.appendChild(cartDiv);

    article.appendChild(img);
    article.appendChild(detailsDiv);

    return article;
}

/**
 * Recreates all product cards.
 */
function rerenderAllProducts() {
    /*
    1. remove all <article>s
    2. recreate them using the data in PRODUCTS
    3. modify the re-creation so it uses shouldProductBeVisible() (details are near the bottom of the lab directions)

    You can remove and recreate the heading element if it makes things easier.
     */
    const productList = document.querySelector('.product-list');
    productList.innerHTML = '';

    const heading = document.createElement('h2');
    heading.textContent = 'Search results';
    productList.appendChild(heading);

    for (let product of PRODUCTS) {
        if (shouldProductBeVisible(product)) {
            const card = renderProductCard(product);
            productList.appendChild(card);
        }
    }
}

/**
 * Recreates all cart panel info.
 */
function rerenderCart() {
    /*
    1. remove all card items
    2. recreate them and the remove buttons based off the data in PRODUCTS
     */
    const cartItemsDiv = document.querySelector('.cart .cart-items');
    cartItemsDiv.innerHTML = '';

    for (let product of PRODUCTS) {
        if (product.numInCart > 0) {
            const p = document.createElement('p');
            p.textContent = `${product.name} x${product.numInCart}`;

            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-button';
            removeBtn.textContent = 'Remove';
            removeBtn.addEventListener('click', () => {
                product.numInCart--;
                rerenderAllProducts();
                rerenderCart();
            });

            cartItemsDiv.appendChild(p);
            cartItemsDiv.appendChild(removeBtn);
        }
    }
}

const minPriceInput = document.querySelector("#minPrice");
const maxPriceInput = document.querySelector("#maxPrice");
/**
 * Returns whether a product should be visible based on the current values of the price filters.
 *
 * @param product product data
 * @return {boolean} whether a product should be visible
 */
function shouldProductBeVisible(product) {
    const min = Number.parseFloat(minPriceInput.value);
    const max = Number.parseFloat(maxPriceInput.value);
    
    if (!isNaN(min) && product.price < min) return false;
    if (!isNaN(max) && product.price > max) return false;
    return true;
}
minPriceInput.addEventListener('change', rerenderAllProducts);
maxPriceInput.addEventListener('change', rerenderAllProducts);
rerenderAllProducts();
rerenderCart();