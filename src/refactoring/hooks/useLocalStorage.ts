import { CartItem } from "../../types";

const CART_STORAGE = "cart"
export const useLocalStorage = (initialState: CartItem[] | []) => {

    const getLocalStorage = () => {
        const storageItems = localStorage.getItem(CART_STORAGE) || JSON.stringify([])
        return JSON.parse(storageItems)
    }

    const cart: CartItem[] = getLocalStorage()

    const setCart = (newCartItems: ((caritems: CartItem[]) => CartItem[]) | CartItem[] | []) => {
        if(typeof newCartItems === 'function') {
            localStorage.setItem(CART_STORAGE, JSON.stringify(newCartItems(cart)));
        } else {
            localStorage.setItem(CART_STORAGE, JSON.stringify(newCartItems));
        }
    }

    setCart(initialState)

    return {
        cart: getLocalStorage(),
        setCart,
    }
}