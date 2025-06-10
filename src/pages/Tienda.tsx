import { useState, useEffect } from "react";
import { Col, Row, ListGroup } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { ProductDetailModal } from "../components/ProductDetailModal";
import { useShoppingCart } from "../context/ShoppingCartContext"; // Import useShoppingCart
import type { Product as Item } from "../context/ShoppingCartContext"; // Use Product as Item

export function Tienda() {
    const { 
        products: items, // Use products as items
        productsLoading: loading, // Use productsLoading as loading
        productsError: error // Use productsError as error
    } = useShoppingCart();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [categories, setCategories] = useState<string[]>([]);

    const [showDetailModal, setShowDetailModal] = useState(false);
    const [currentItemDetails, setCurrentItemDetails] = useState<Item | null>(null);

    const handleOpenModalWithItemId = (id: number) => {
        const itemToShow = items.find(item => item.id === id);
        if (itemToShow) {
            // Assuming Item type now includes productCategory or it's dynamically available
            setCurrentItemDetails(itemToShow as Item); 
            setShowDetailModal(true);
        } else {
            console.error(`Item with id ${id} not found.`);
        }
    };

    const handleCloseDetailModal = () => {
        setShowDetailModal(false);
        setCurrentItemDetails(null); // Optional: clear details on close
    };

    // useEffect to update categories when items change
    useEffect(() => {
        if (items && items.length > 0) {
            // Assuming 'productCategory' exists on items from context
            const uniqueCategories = Array.from(new Set(items.map((item: any) => item.productCategory)));
            setCategories(['Todos', ...uniqueCategories.filter(category => category != null).map(String)]);
        } else {
            setCategories(['Todos']);
        }
    }, [items]);

    const filteredItems = items.filter((item: any) => { // Use 'any' for now for productCategory
        const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "" || selectedCategory === "Todos" || item.productCategory === selectedCategory;
        return matchesSearchTerm && matchesCategory;
    });

    if (loading) {
        return (
            <>
                <style>
                    {`
                        .spinner-container {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                        }

                        .spinner {
                            border: 4px solid rgba(0, 0, 0, 0.1);
                            width: 36px;
                            height: 36px;
                            border-radius: 50%;
                            border-left-color: #09f;
                            animation: spin 1s ease infinite;
                        }

                        @keyframes spin {
                            0% {
                                transform: rotate(0deg);
                            }
                            100% {
                                transform: rotate(360deg);
                            }
                        }
                    `}
                </style>
                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>
            </>
        );
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    return (
        <>
            <Row>
                {/* Category Filter Column */}
                <Col md={3}>
                    <ListGroup>
                        {categories.map((category) => (
                            <ListGroup.Item
                                key={category}
                                action // Makes it look clickable
                                active={category === selectedCategory || (selectedCategory === "" && category === "Todos")}
                                onClick={() => setSelectedCategory(category === "Todos" ? "" : category)}
                            >
                                {category}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>

                {/* Products Column (existing content) */}
                <Col md={9}>
                    <div className="mb-4"> {/* Search bar */}
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="form-control"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Row md={2} xs={1} lg={3} className="g-3"> {/* Product grid */}
                        {filteredItems.map((item) => (
                            <Col key={item.id}>
                                <StoreItem 
                                    id={item.id} 
                                    name={item.name} 
                                    price={item.price}
                                    stock={item.stock}  
                                    imgUrl={item.imageUrl}
                                    onItemClick={handleOpenModalWithItemId}
                                />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
            
            <ProductDetailModal 
                show={showDetailModal} 
                onHide={handleCloseDetailModal} 
                item={currentItemDetails} 
            />
        </>
    );
}
