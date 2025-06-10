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
    refreshProducts: () => Promise<void> // Add refreshProducts to context type
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

    // Define fetchProducts function
    const fetchProducts = async () => {
        setProductsLoading(true);
        setProductsError(null);
        try {
            const response = await fetch("http://localhost:8080/api/productos");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
            setProductsError("Hubo un error. Por favor comunicarse al número de Whatsapp. Muchas gracias por su paciencia.");
        } finally {
            setProductsLoading(false);
        }
    };

    // useEffect to fetch products on mount
    useEffect(() => {
        fetchProducts();
    }, []);

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    function getItemQuantity(id: number) {
        return cartItems.find(item=> item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id: number) {
      // Find the product from the products list
      const product = products.find(p => p.id === id);

      // If product not found, do nothing (or handle error)
      if (!product) {
        console.error(`Product with id ${id} not found.`);
        return; 
      }

      setCartItems(currItems => {
        const itemInCart = currItems.find(item => item.id === id);

        if (itemInCart == null) {
          // Item not in cart, add if stock is available
          if (product.stock > 0) {
            return [...currItems, { id, quantity: 1 }];
          } else {
            // Stock is 0, cannot add
            console.warn(`Product ${product.name} is out of stock.`);
            return currItems; // Return current items without adding
          }
        } else {
          // Item already in cart, increase quantity if stock allows
          if (product.stock > itemInCart.quantity) {
            return currItems.map(item => {
              if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 };
              } else {
                return item;
              }
            });
          } else {
            // Not enough stock to increase quantity
            console.warn(`Not enough stock for ${product.name}. Current quantity: ${itemInCart.quantity}, Stock: ${product.stock}`);
            return currItems; // Return current items without changing quantity
          }
        }
      });
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
            refreshProducts: fetchProducts, // Expose refreshProducts
        }}>
            {children}
        <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
    )
}
