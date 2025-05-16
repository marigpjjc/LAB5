import Root from "./Root/Root";
import Products from "./components/products/products";
import Cart from "./components/cart/cart";

customElements.define('root-element', Root);
customElements.define('products-card', Products);
customElements.define('cart-card', Cart);