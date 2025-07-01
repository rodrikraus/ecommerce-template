import { Button, Offcanvas, Stack, Modal } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import { useState } from "react";
import { CheckoutModal } from "./CheckoutModal";

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
        productsError,
        refreshProducts // Destructure refreshProducts
    } = useShoppingCart();

    const [showCheckoutModal, setShowCheckoutModal] = useState(false);
    const [isSubmittingOrder, setIsSubmittingOrder] = useState(false); // Added state for submission loading
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    function handleOpenCheckoutModal() {
        if (cartItems.length === 0) {
            alert("Your cart is empty.");
            return;
        }
        setShowCheckoutModal(true);
    }

    const handleCloseCheckoutModal = () => {
        if (isSubmittingOrder) return; // Prevent closing if submitting
        setShowCheckoutModal(false);
    }

    async function processCheckout(email: string, shippingAddress: string, numeroCelular: string): Promise<void> { // Return Promise
        if (productsLoading || productsError) {
            alert("Product information is not available. Please try again later.");
            return;
        }

        setIsSubmittingOrder(true); // Start loading

        const itemsPayload = cartItems.map(cartItem => {
            const product = products.find(p => p.id === cartItem.id);
            return {
                quantity: cartItem.quantity,
                unitPrice: product?.price || 0,
                product: {
                    id: cartItem.id
                }
            };
        });

        const compraPayload = {
            fechaCompra: new Date().toISOString(),
            shippingAddress: shippingAddress,
            email: email,
            numeroCelular: numeroCelular,
            user: {
                id: 1 //Defaults to user 1, which is the only user in the database
            },
            items: itemsPayload,
        };

        try {
            const response = await fetch("http://localhost:8080/api/compras", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(compraPayload),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}. Details: ${errorData}`);
            }

            // Refresh products before clearing cart and showing success
            await refreshProducts();
            
            // First, clear cart and close other UI elements
            cartItems.forEach(item => removeFromCart(item.id)); 
            setShowCheckoutModal(false); 
            closeCart(); 
            // Then, show the success modal
            setShowSuccessModal(true); 
        } catch (error) {
            console.error("Error during checkout:", error);
            alert(`Error al procesar la compra: ${error instanceof Error ? error.message : "Unknown error"}`);
            // Keep modal open by not calling setShowCheckoutModal(false) on error
        } finally {
            setIsSubmittingOrder(false); // End loading regardless of outcome
        }
    }

    return (
        <>
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
                            onClick={handleOpenCheckoutModal} 
                            disabled={cartItems.length === 0 || productsLoading || !!productsError}
                        >
                            Comprar
                        </Button>
                    </Stack>
                </Offcanvas.Body>
            </Offcanvas>
            
            <CheckoutModal 
                show={showCheckoutModal}
                handleClose={handleCloseCheckoutModal}
                handleSubmit={processCheckout}
                isSubmitting={isSubmittingOrder} // Pass loading state
            />

            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Éxito</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¡Compra realizada con éxito!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
                        Aceptar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
