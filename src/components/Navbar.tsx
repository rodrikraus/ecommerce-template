import {Button, Container, Nav, Navbar as NavBarBs} from "react-bootstrap"
import {NavLink} from "react-router-dom"
import { useShoppingCart } from "../context/ShoppingCartContext"

export function NavBar() {
    const { openCart, cartQuantity } = useShoppingCart()
    return <NavBarBs sticky="top" className="bg-white shadow-sm mb-3">
        <Container>
            <Nav className="me-auto">
                <Nav.Link to="/" as={NavLink}>Home</Nav.Link>
                <Nav.Link to="/store" as={NavLink}>Store</Nav.Link>
                <Nav.Link to="/about" as={NavLink}>About</Nav.Link>
            </Nav>
            <Button onClick={openCart} style={{width: "3rem", height: "3rem", position: "relative"}} variant="outline-primary" className="rounded-circle">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.79166 2H1V4H4.2184L6.9872 16.6776H7V17H20V16.7519L22.1932 7.09095L22.5308 6H6.6552L6.08485 3.38852L5.79166 2ZM19.9869 8H7.092L8.62081 15H18.3978L19.9869 8Z"
                        fill="currentColor"
                    />
                    <path
                        d="M10 22C11.1046 22 12 21.1046 12 20C12 18.8954 11.1046 18 10 18C8.89543 18 8 18.8954 8 20C8 21.1046 8.89543 22 10 22Z"
                        fill="currentColor"
                    />
                    <path
                        d="M19 20C19 21.1046 18.1046 22 17 22C15.8954 22 15 21.1046 15 20C15 18.8954 15.8954 18 17 18C18.1046 18 19 18.8954 19 20Z"
                        fill="currentColor"
                    />
                </svg>
                <div className="rounded-circle bg-danger d-flex justify-content-center align-items-center" 
                style={{
                    color: "white", 
                    width: "1.5rem", 
                    height: "1.5rem", 
                    position: "absolute", 
                    bottom: 0, 
                    right: 0, 
                    transform: "translate(25%, 25%)"}}>
                    {cartQuantity}
                </div>
            </Button>
        </Container>
    </NavBarBs>    
}