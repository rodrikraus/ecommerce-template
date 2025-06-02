import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";

type ShoppingCartProps = {
    isOpen: boolean
}

export function ShoppingCart({isOpen}: ShoppingCartProps) {
    const { 
        closeCart, 
        cartItems, 
        removeFromCart, 
        products, 
        productsLoading, 
        productsError 
    } = useShoppingCart();

    function handleBuy() {
        cartItems.forEach(item => removeFromCart(item.id))
        closeCart()
        alert("Gracias por su compra!")
    }

    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Carrito</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map(item => (<CartItem key={item.id} {...item}/>))}
                    
                    {productsLoading && <div className="ms-auto fw-bold fs-5">Loading total...</div>}
                    
                    {productsError && <div className="ms-auto fw-bold fs-5" style={{color: "red"}}>Error: {productsError}</div>}
                    
                    {!productsLoading && !productsError && (
                        <div className="ms-auto fw-bold fs-5">
                            Total {formatCurrency(cartItems.reduce((total, cartItem) => {
                                const item = products.find(p => p.id === cartItem.id);
                                return total + (item?.price || 0) * cartItem.quantity;
                            }, 0))}
                        </div>
                    )}
                    <Button 
                        variant="primary" 
                        onClick={handleBuy} 
                        disabled={cartItems.length === 0 || productsLoading || !!productsError}
                    >
                        Comprar
                    </Button>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
