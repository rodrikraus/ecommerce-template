import { createContext, useContext, useState, useEffect } from "react"
import type { ReactNode } from "react"
import { ShoppingCart } from "../components/ShoppingCart"
import { useLocalStorage } from "../hooks/useLocalStorage"

type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number
    quantity: number
}

// Define the Product interface
export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    description: string;
    imageUrl: string;
}

type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]
    products: Product[] // Add products to context type
    productsLoading: boolean // Add loading state for products
    productsError: string | null // Add error state for products
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }:ShoppingCartProviderProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", [])

    // State for products
    const [products, setProducts] = useState<Product[]>([]);
    const [productsLoading, setProductsLoading] = useState(true);
    const [productsError, setProductsError] = useState<string | null>(null);

    // useEffect to fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/productos");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
                setProductsError("Failed to load product information.");
            } finally {
                setProductsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    function getItemQuantity(id: number) {
        return cartItems.find(item=> item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id: number) {
        setCartItems(currItems => {
          if (currItems.find(item => item.id === id) == null) {
            return [...currItems, { id, quantity: 1 }]
          } else {
            return currItems.map(item => {
              if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 }
              } else {
                return item
              }
            })
          }
        })
      }

      function decreaseCartQuantity(id: number) {
        setCartItems(currItems => {
          if (currItems.find(item => item.id === id)?.quantity === 1) {
            return currItems.filter(item => item.id !== id)
          } else {
            return currItems.map(item => {
              if (item.id === id) {
                return { ...item, quantity: item.quantity - 1 }
              } else {
                return item
              }
            })
          }
        })
      }

      function removeFromCart(id: number) {
        setCartItems(currItems => {
          return currItems.filter(item => item.id !== id)
        })
      }

    return (
        <ShoppingCartContext.Provider value={{
            getItemQuantity,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeFromCart,
            openCart, 
            closeCart,
            cartItems,
            cartQuantity,
            products, // Expose products
            productsLoading, // Expose productsLoading
            productsError, // Expose productsError
        }}>
            {children}
        <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
    )
}
