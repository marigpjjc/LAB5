import { StoreActions } from '../../flux/Actions';
import { State, store } from "../../flux/Store";

class Products extends HTMLElement {
    connectedCallback() {
        store.subscribe((state: State) => { this.handleChange(state) });
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    handleChange(state: State) {
        this.render(state);
    }

    render(_state = store.getState()) {
        if (!this.shadowRoot) return;

        const title = this.getAttribute('title') || 'Product Title';
        const price = this.getAttribute('price') || '0';
        const description = this.getAttribute('description') || 'Product Description';
        const image = this.getAttribute('image') || '';
        const idAttr = this.getAttribute('id') || `${Math.floor(Math.random() * 10000)}`;
        const id = Number(idAttr);

        this.shadowRoot.innerHTML = `
            <style>
            :host {
                font-family: 'Segoe UI', sans-serif;
            }

            .products-card {
                background-color: #fff;
                border-radius: 12px;
                padding: 16px;
                box-shadow: 0 6px 18px rgba(0, 0, 0, 0.07);
                transition: transform 0.2s ease-in-out;
                text-align: center;
            }

            .products-card:hover {
                transform: translateY(-5px);
            }

            .product-image {
                width: 80px;
                height: 80px;
                object-fit: cover;
                border-radius: 8px;
                margin-bottom: 10px;
            }

            .product-title {
                font-size: 1.1rem;
                font-weight: 600;
                margin: 0.5rem 0;
                color: #2c3e50;
            }

            .product-price {
                font-size: 1rem;
                color: #16a085;
                margin: 0.3rem 0;
            }

            .product-description {
                font-size: 0.8rem;
                color: #7f8c8d;
                margin-bottom: 1rem;
            }

            button {
                background-color: #27ae60;
                color: white;
                border: none;
                padding: 10px 14px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
                transition: background-color 0.3s ease;
                font-size: 0.9rem;
            }

            button:hover {
                background-color: #1e8449;
            }
            </style>

            <div class="products-card">
                <img src="${image}" alt="${title}" class="product-image" />
                <h3 class="product-title">${title}</h3>
                <p class="product-price">$${price}</p>
                <p class="product-description">${description}</p>
                <button id="add-item-to-cart">Add to Cart</button>
            </div>
        `;

        this.shadowRoot.querySelector('#add-item-to-cart')?.addEventListener('click', () => {
            const product = {
                id,
                title,
                price: Number(price),
                description,
                image
            };

            StoreActions.addItemToCart(product);
        });
    }
}

export default Products;
