import { AppDispatcher, Action } from './Dispatcher';
import { StoreActionTypes } from './Actions';

export type User = {
    name: string;
    age: number;
};

export type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
};

export type CartProducts = {
    product: Product;
    id: number;
};

export type State = {
    products: Product[];
    cart: CartProducts[];
};

type Listener = (state: State) => void;

class Store {
    private _myState: State = {
        products: [],
        cart: [],
    };

    private _listeners: Listener[] = [];

    constructor() {
        AppDispatcher.register(this._handleActions.bind(this));
        this.load();
    }

    getState() {
        return this._myState;
    }

    _handleActions(action: Action): void {
        switch (action.type) {
            case StoreActionTypes.FETCH_ITEMS:
                if (Array.isArray(action.payload)) {
                    this._myState = {
                        ...this._myState,
                        products: action.payload as Product[],
                    };
                }
                this._emitChange();
                break;

            case StoreActionTypes.ADD_ITEM_TO_CART:
                const newItem = action.payload as CartProducts;
                const exists = this._myState.cart.some(item => item.id === newItem.id);
                if (!exists) {
                    this._myState = {
                        ...this._myState,
                        cart: [...this._myState.cart, newItem],
                    };
                    this._emitChange();
                }
                break;

            case StoreActionTypes.REMOVE_ITEM_FROM_CART:
                if (typeof action.payload === 'number') {
                    this._myState = {
                        ...this._myState,
                        cart: this._myState.cart.filter((item) => item.id !== action.payload),
                    };
                }
                this._emitChange();
                break;
        }
        this.persist();
    }

    private _emitChange(): void {
        const state = this.getState();
        for (const listener of this._listeners) {
            listener(state);
        }
    }

    subscribe(listener: Listener): void {
        this._listeners.push(listener);
        listener(this.getState());
    }

    unsubscribe(listener: Listener): void {
        this._listeners = this._listeners.filter(l => l !== listener);
    }

    persist(): void {
        localStorage.setItem('flux:state', JSON.stringify(this._myState));
    }

    load(): void {
        const persistedState = localStorage.getItem('flux:state');
        if (persistedState) {
            this._myState = JSON.parse(persistedState);
            this._emitChange();
        }
    }
}

export const store = new Store();
