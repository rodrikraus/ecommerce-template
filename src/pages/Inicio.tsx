import { Button, Container, Row, Col, Card } from 'react-bootstrap'; // Added Card
import { Link } from 'react-router-dom';

export function Inicio() {
    // Dummy data for featured items
    const featuredProducts = [
        { id: 1, name: "Latest Model Phone", description: "Experience the next generation of mobile.", imagePlaceholder: "https://via.placeholder.com/300x200.png?text=Phone+1", price: "$999" },
        { id: 2, name: "Premium Wireless Earbuds", description: "Immersive sound, all-day comfort.", imagePlaceholder: "https://via.placeholder.com/300x200.png?text=Earbuds", price: "$199" },
        { id: 3, name: "Smartwatch Series X", description: "Stay connected, stay active.", imagePlaceholder: "https://via.placeholder.com/300x200.png?text=Smartwatch", price: "$299" },
        { id: 4, name: "Protective Phone Case", description: "Style and security for your device.", imagePlaceholder: "https://via.placeholder.com/300x200.png?text=Case", price: "$49" },
    ];

    return (
        <>
            {/* Hero Section (already implemented) */}
            <Container fluid className="bg-light p-5 mb-5 text-center">
                <Row className="py-lg-5">
                    <Col lg={8} md={10} className="mx-auto">
                        <h1 className="display-4 fw-bold">Reparación profesional y accesorios de calidad para tu celular</h1>
                        <p className="lead text-muted">
                            Descubrí nuestro servicio de reparación exprés y una selección de accesorios pensados para cuidar y potenciar tu celular.
                        </p>
                        <p>
                            <Link to="/tienda">
                                <Button variant="primary" size="lg" className="me-2">Ver productos</Button>
                            </Link>
                            <Link to="/about">
                                <Button variant="outline-secondary" size="lg">Aprender más</Button>
                            </Link>
                        </p>
                    </Col>
                </Row>
            </Container>

        </>
    );
}