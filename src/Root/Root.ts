import { StoreActions } from '../flux/Actions';
import { Product, store } from '../flux/Store';

class Root extends HTMLElement {
    products: Product[] = []; 
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
    await StoreActions.fetchItems();
    this.render();
}


    async render() {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
            <style>
            :host {
                display: block;
                font-family: 'Segoe UI', sans-serif;
                background-color: #f4f6f8;
                min-height: 100vh;
                box-sizing: border-box;
            }

            h1 {
                font-size: 2.5rem;
                font-weight: 700;
                color: #2c3e50;
                text-align: center;
                margin: 2rem 0 1rem;
                font-family: 'Segoe UI', sans-serif;
            }

            .layout {
                display: flex;
                gap: 2rem;
                align-items: flex-start;
                justify-content: center;
                padding: 0 2rem;
                flex-wrap: wrap;
            }

            #product-list {
                width: 60%;
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
                gap: 1.5rem;
                list-style-type: none;
                padding: 0;
                margin: 0;
            }

            cart-card {
                width: 35%;
                background: #ffffff;
                border: 2px solid #d1d8e0;
                border-radius: 12px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
                padding: 1rem;
            }

            @media (max-width: 900px) {
                .layout {
                flex-direction: column;
                }

                #product-list,
                cart-items {
                width: 100%;
                }
            }
            </style>

            <h1>Tienda</h1>
            <div class="layout">
            <ul id="product-list"></ul>
            <cart-card></cart-card>
            </div> 
        `;

        const productList = this.shadowRoot.querySelector('#product-list');
        store.getState().products.forEach((product: Product) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <products-card title="${product.title}" price="${product.price}" description="${product.description}" image="${product.image}"></products-card>
            `;
            productList?.appendChild(li);
        });
    }
}

export default Root;