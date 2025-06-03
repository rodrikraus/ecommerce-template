import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { formatCurrency } from '../utilities/formatCurrency';

export interface Item {
    id: number;
    name: string;
    price: number;
    description: string;
    stock: number;
    imageUrl: string;
}

interface ProductDetailModalProps {
    show: boolean;
    onHide: () => void;
    item: Item | null;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ show, onHide, item }) => {
    if (!item) {
        return null;
    }

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{item.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ position: "relative", marginBottom: "1rem" }}>
                    <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        style={{ 
                            width: "100%", 
                            maxHeight: "400px", 
                            objectFit: "contain",
                            filter: item.stock < 1 ? "grayscale(100%)" : "none" 
                        }} 
                    />
                    {item.stock < 1 && (
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: 'white',
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            zIndex: 1 
                        }}>
                            Sin stock
                        </div>
                    )}
                </div>
                <p>{item.description}</p>
                <p><strong>Price:</strong> {formatCurrency(item.price)}</p>
                <p><strong>Stock:</strong> {item.stock}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
