import { Button, Container, Row, Col } from 'react-bootstrap'; // Added Card
import { Link } from 'react-router-dom';

export function Inicio() {

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