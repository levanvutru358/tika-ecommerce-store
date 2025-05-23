/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import type { CartItem } from "@/types/cart_item.type";
import { createContext, useContext, useState } from "react";

type CartContextType = {
   cartItem: CartItem[] | []
   addItemToCart: any
   removeItemFromCart: any
   clearCart: any
};

export const CartContext = createContext<CartContextType | undefined>(undefined);
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItem, setCartItem] = useState<CartItem[] | []>([]);
    const addItemToCart = (item: CartItem) => {
         setCartItem((prevState) => [...prevState, item]);
    }

    const removeItemFromCart = (id: number) => {
        const newCartItem = cartItem.filter((item) => item.id !== id);
        setCartItem(newCartItem);
    }

    const clearCart = () => {
        setCartItem([])
    }

    return (
        <CartContext.Provider value={{cartItem, addItemToCart, removeItemFromCart, clearCart}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
};