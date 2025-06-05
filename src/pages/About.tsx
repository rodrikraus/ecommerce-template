import { Container, Row, Col, Image } from 'react-bootstrap';

export function About() {
    return (
        <Container className="py-5">
            {/* Page Title */}
            <Row className="mb-4 text-center">
                <Col>
                    <h1 className="display-4 fw-bold">Sobre Nosotros</h1>
                </Col>
            </Row>

            {/* Our Mission & Vision Section */}
            <Row className="mb-5 align-items-center">
                <Col md={6} className="mb-3 mb-md-0">
                    <Image src="/imgs/aboutus1.webp" rounded fluid style={{ width: '500px', height: '300px' }} />
                </Col>
                <Col md={6}>
                    <h2>Nuestra Misión y Visión</h2>
                    <p>Nuestra misión es brindar soluciones rápidas, confiables y accesibles para todo tipo de problemas con celulares, ofreciendo también una amplia gama de accesorios de calidad para mejorar la experiencia del usuario.</p>
                    <p>Nuestra visión es convertirnos en el centro de referencia en reparación de dispositivos móviles y venta de accesorios, destacándonos por la confianza, la atención personalizada y la innovación constante.</p>
                </Col>
            </Row>

            {/* Our Story Section */}
            <Row className="mb-5 bg-light p-4 rounded align-items-center">
                <Col md={6} className="order-md-2 mb-3 mb-md-0">
                    <Image src="/imgs/aboutus2.webp" rounded fluid  style={{ width: '500px', height: '300px' }} />
                </Col>
                <Col md={6} className="order-md-1">
                    <h2>Nuestra Historia</h2>
                    <p>Este emprendimiento nació en 2022 con la idea de cubrir una necesidad real: la falta de servicios de reparación de celulares rápidos y confiables en el barrio. Empezamos en un pequeño local, con herramientas básicas pero con muchas ganas de crecer.</p>
                    <p>Gracias al apoyo de nuestros clientes y a nuestro compromiso con la calidad, fuimos expandiendo nuestros servicios, incorporando técnicos especializados y una línea completa de accesorios para todos los modelos y marcas.</p>
                </Col>
            </Row>

            {/* Our Values Section */}
            <Row className="mb-5 text-center">
                <Col>
                    <h2>Nuestros Valores</h2>
                    <p>Nos guiamos por valores que reflejan nuestro compromiso con cada cliente que confía en nosotros. Estos principios nos ayudan a construir relaciones duraderas basadas en la transparencia y la excelencia.</p>
                </Col>
            </Row>
            <Row className="mb-5 text-center g-4">
                <Col md={4}>
                    <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🔧</div>
                    <h4>Calidad</h4>
                    <p>Usamos repuestos confiables y trabajamos con precisión en cada reparación para garantizar resultados duraderos.</p>
                </Col>
                <Col md={4}>
                    <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🤝</div>
                    <h4>Confianza</h4>
                    <p>Construimos relaciones transparentes con nuestros clientes, ofreciendo diagnósticos claros y precios justos.</p>
                </Col>
                <Col md={4}>
                    <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>⚡</div>
                    <h4>Rapidez</h4>
                    <p>Sabemos lo importante que es tu celular, por eso ofrecemos reparaciones en el menor tiempo posible.</p>
                </Col>
            </Row>

            {/* Our Team Section */}
            <Row className="text-center">
                <Col>
                    <h2>Nuestro Equipo</h2>
                    <p>Somos un grupo de técnicos apasionados por la tecnología y comprometidos con brindar la mejor atención. Cada miembro del equipo aporta experiencia, dedicación y buena onda para que tu visita sea excelente.</p>
                    <Image src="/imgs/aboutus3.jpg" rounded fluid style={{ width: '800px', height: '500px' }} />
                </Col>
            </Row>
        </Container>
    );
}
