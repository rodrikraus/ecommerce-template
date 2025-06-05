import { Button, Container, Nav, Navbar as NavBarBs, Offcanvas } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useState } from "react";

export function NavBar() {
    const { openCart, cartQuantity } = useShoppingCart();
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    // Function to close Offcanvas when clicking a Nav.Link
    function handleClose() {
        setShowOffcanvas(false);
    }

    // Function to open Offcanvas (called by toggle button)
    function handleShow() {
        setShowOffcanvas(true);
    }

    return (
        <NavBarBs sticky="top" expand="sm" className="bg-white shadow-sm mb-2 py-1">
            <Container>
                {/* Logo  */}
                <NavLink to="/" className="navbar-brand">
                    <img src="/imgs/logo.PNG" alt="Logo" className="me-3" style={{ cursor: "pointer", height: "3rem" }} />
                </NavLink>
                {/* Toggle Button for Smaller Screens */}
                <NavBarBs.Toggle aria-controls="offcanvasNavbar" onClick={handleShow}/>

                {/* Offcanvas Menu */}
                <NavBarBs.Offcanvas 
                    id="offcanvasNavbar" 
                    aria-labelledby="offcanvasNavbarLabel" 
                    placement="end"
                    show={showOffcanvas}
                    onHide={handleClose}
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {/* Navigation Links */}
                        <Nav className="me-auto d-flex align-items-center gap-3">
                            <Nav.Link to="/" as={NavLink} onClick={handleClose}>
                                Inicio
                            </Nav.Link>
                            <Nav.Link to="/tienda" as={NavLink} onClick={handleClose}>
                                Tienda
                            </Nav.Link>
                            <Nav.Link to="/about" as={NavLink} onClick={handleClose}>
                                Sobre nosotros
                            </Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </NavBarBs.Offcanvas>

                <Button
                    onClick={openCart}
                    style={{
                        width: "2.5rem",
                        height: "2.5rem",
                        position: "relative",
                        color: "black",  // Make the icon color black
                        border: "none",
                        backgroundColor: "transparent",  // Make the button background transparent
                    }}>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.79166 2H1V4H4.2184L6.9872 16.6776H7V17H20V16.7519L22.1932 7.09095L22.5308 6H6.6552L6.08485 3.38852L5.79166 2ZM19.9869 8H7.092L8.62081 15H18.3978L19.9869 8Z"
                            fill="currentColor"  // Uses current color (black in this case)
                        />
                        <path
                            d="M10 22C11.1046 22 12 21.1046 12 20C12 18.8954 11.1046 18 10 18C8.89543 18 8 18.8954 8 20C8 21.1046 8.89543 22 10 22Z"
                            fill="currentColor"  // Uses current color (black in this case)
                        />
                        <path
                            d="M19 20C19 21.1046 18.1046 22 17 22C15.8954 22 15 21.1046 15 20C15 18.8954 15.8954 18 17 18C18.1046 18 19 18.8954 19 20Z"
                            fill="currentColor"  // Uses current color (black in this case)
                        />
                    </svg>
                    <div
                        className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                        style={{
                            color: "white",
                            width: "1.25rem",
                            height: "1.25rem",
                            position: "absolute",
                            bottom: 28,
                            right: -8,
                            transform: "translate(25%, 25%)",
                        }}
                    >
                        {cartQuantity}
                    </div>
                </Button>

            </Container>
        </NavBarBs>
    );
}