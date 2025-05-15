import { useState } from "react";
import storeItems from "../data/items.json";
import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";

export function Tienda() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredItems = storeItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <h1>Tienda</h1> 
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Buscar..."
                    className="form-control"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Row md={2} xs={1} lg={3} className="g-3">
                {filteredItems.map((item) => (
                    <Col key={item.id}>
                        <StoreItem {...item} />
                    </Col>
                ))}
            </Row>
        </>
    );
}
