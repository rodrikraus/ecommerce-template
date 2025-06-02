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
                <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    style={{ 
                        width: "100%", 
                        maxHeight: "400px", // Max height to avoid overly large images
                        objectFit: "contain", // 'contain' to see the whole image
                        marginBottom: "1rem" 
                    }} 
                />
                <p>{item.description}</p>
                <p><strong>Price:</strong> {formatCurrency(item.price)}</p>
                <p><strong>Stock:</strong> {item.stock > 0 ? item.stock : <span style={{color: 'red'}}>Out of Stock</span>}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
