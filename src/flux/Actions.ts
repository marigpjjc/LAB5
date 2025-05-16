import { getProducts } from '../services/fakeApi';
import { AppDispatcher } from './Dispatcher';
import { Product } from './Store';

export const StoreActionTypes = {
    FETCH_ITEMS: 'FETCH_ITEMS',
    ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
    REMOVE_ITEM_FROM_CART: 'REMOVE_ITEM_FROM_CART',
};

export const StoreActions = {
    fetchItems: async () => {
        const items = await getProducts();
        AppDispatcher.dispatch({
            type: StoreActionTypes.FETCH_ITEMS,
            payload: items,
        });
    },

    addItemToCart: async (item: Product) => {
        const cartEntry = {
            product: item,
            id: item.id,
        };
        AppDispatcher.dispatch({
            type: StoreActionTypes.ADD_ITEM_TO_CART,
            payload: cartEntry,
        });
    },

    removeItemFromCart: (id: string) => {
        AppDispatcher.dispatch({
            type: StoreActionTypes.REMOVE_ITEM_FROM_CART,
            payload: Number(id),
        });
    },
};

