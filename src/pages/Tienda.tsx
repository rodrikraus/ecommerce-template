import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { ProductDetailModal } from "../components/ProductDetailModal";

// Define the type for the fetched items
interface Item {
    id: number;
    name: string;
    price: number;
    stock: number;
    description: string;
    imageUrl: string;
}

export function Tienda() {
    const [searchTerm, setSearchTerm] = useState("");
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [showDetailModal, setShowDetailModal] = useState(false);
    const [currentItemDetails, setCurrentItemDetails] = useState<Item | null>(null);

    const handleOpenModalWithItemId = (id: number) => {
        const itemToShow = items.find(item => item.id === id);
        if (itemToShow) {
            setCurrentItemDetails(itemToShow);
            setShowDetailModal(true);
        } else {
            console.error(`Item with id ${id} not found.`);
        }
    };

    const handleCloseDetailModal = () => {
        setShowDetailModal(false);
        setCurrentItemDetails(null); // Optional: clear details on close
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/productos");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setItems(data);
            } catch (e) {
                console.error("Error fetching data:", e);
                setError("Failed to load products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

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
                        <StoreItem 
                            id={item.id} 
                            name={item.name} 
                            price={item.price} 
                            imgUrl={item.imageUrl}
                            onItemClick={handleOpenModalWithItemId} // Pass the new handler
                        />
                    </Col>
                ))}
            </Row>
            
            <ProductDetailModal 
                show={showDetailModal} 
                onHide={handleCloseDetailModal} 
                item={currentItemDetails} 
            />
        </>
    );
}
