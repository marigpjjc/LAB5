import { StoreActions } from '../../flux/Actions';
import { CartProducts, State, store } from "../../flux/Store";

class Cart extends HTMLElement {
    connectedCallback() {
        store.subscribe((state: State) => { this.handleChange(state) });
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    handleChange(state: State) {
        this.render(state);
    }

    render(state = store.getState()) {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
            <style>
            :host {
              font-family: 'Segoe UI', sans-serif;
            }

            .shopping-list {
              list-style-type: none;
              padding: 0;
              margin: 0;
            }

            .cart-item {
              background: #fdfdfd;
              border: 1px solid #e1e1e1;
              border-radius: 10px;
              padding: 1rem;
              margin-bottom: 1rem;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
              text-align: center;
            }

            .cart-item img {
              max-width: 60px;
              border-radius: 6px;
              margin-bottom: 0.5rem;
            }

            .cart-item h2 {
              font-size: 1rem;
              margin: 0.4rem 0;
              color: #34495e;
            }

            .cart-item p {
              font-size: 0.85rem;
              color: #7f8c8d;
              margin: 0.3rem 0;
            }

            .cart-item h3 {
              font-size: 0.95rem;
              color: #2e86de;
              margin: 0.5rem 0;
            }

            button {
              background-color: #e74c3c;
              color: white;
              border: none;
              padding: 8px 12px;
              border-radius: 6px;
              cursor: pointer;
              font-weight: 500;
              transition: background-color 0.3s ease;
              font-size: 0.85rem;
            }

            button:hover {
              background-color: #c0392b;
            }
          </style>

            <ul class="shopping-list">
            ${state.cart.length === 0 
            ? '<p>Cart is empty</p>' 
            : state.cart.map((cartproducts: CartProducts) => `
                <li class="cart-item">
                    <img src="${cartproducts.product.image}" alt="${cartproducts.product.title}">
                    <h2>${cartproducts.product.title}</h2>
                    <p>${cartproducts.product.description}</p>
                    <h3>$${cartproducts.product.price}</h3>
                    <button class="remove" id="${cartproducts.id}">Remove</button>
                </li>`).join("")}
            </ul>
        `;

        const removeButtons = this.shadowRoot.querySelectorAll('.remove');
        removeButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('id');
                if (id) {
                    StoreActions.removeItemFromCart(id);
                }
            });
        });
    }
}

export default Cart;
