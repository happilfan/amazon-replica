import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

function renderProducts(productsToRender) {
    let productsHTML = '';

    productsToRender.forEach((product) => {
        productsHTML += /* html */ `
            <div class="product-container">
              <div class="product-image-container">
                <img class="product-image"
                  src="${product.image}">
              </div>

              <div class="product-name limit-text-to-2-lines">
                ${product.name}
              </div>

              <div class="product-rating-container">
                <img class="product-rating-stars"
                  src="${product.getStarsUrl()}">
                <div class="product-rating-count link-primary">
                  ${product.rating.count}
                </div>
              </div>

              <div class="product-price">
                ${product.getPrice()}
              </div>

              <div class="product-quantity-container">
                <select>
                  <option selected value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>

              ${product.extraInfoHTML()}

              <div class="product-spacer"></div>

              <div class="added-to-cart">
                <img src="images/icons/checkmark.png">
                Added
              </div>

              <button class="add-to-cart-button js-add-to-cart button-primary"
              data-product-id="${product.id}">
                Add to Cart
              </button>
            </div>
        `;
    });

    document.querySelector('.js-products-grid').innerHTML = productsHTML;

    attachAddToCartListeners();
}

function filterProducts() {
    const selectedPrice = document.querySelector('input[name="price"]:checked').value;
    const selectedReview = document.querySelector('input[name="reviews"]:checked').value;

    const filteredProducts = products.filter((product) => {
        const price = product.priceCents / 100;
        const stars = product.rating.stars;

        let priceMatch = true;
        let reviewMatch = true;

        if (selectedPrice !== 'all') {
            priceMatch = price < Number(selectedPrice);
        }

        if (selectedReview !== 'all') {
            reviewMatch = stars >= Number(selectedReview);
        }

        return priceMatch && reviewMatch;
    });

    renderProducts(filteredProducts);
}

document.querySelectorAll('input[name="price"], input[name="reviews"]')
    .forEach((radio) => {
        radio.addEventListener('change', filterProducts);
    });

function updateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => { 
        cartQuantity += cartItem.quantity;
    });

    document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;

    console.log(cart);
}

function attachAddToCartListeners() {
    document.querySelectorAll('.js-add-to-cart')
        .forEach((button) => { button.addEventListener('click', () => {
                const productId = button.dataset.productId;
                addToCart(productId);
                updateCartQuantity();
            });});
}

renderProducts(products);