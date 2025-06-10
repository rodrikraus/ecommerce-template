import { Button, Card } from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrency"
import { useShoppingCart } from "../context/ShoppingCartContext"

type StoreItemProps = {
    id: number
    name: string
    price: number
    imgUrl: string
    stock: number // Added this line
    onItemClick?: (id: number) => void
}

export function StoreItem({id, name, price, imgUrl, stock, onItemClick}:StoreItemProps) {
    const { getItemQuantity, 
        increaseCartQuantity, 
        decreaseCartQuantity, 
        removeFromCart } = useShoppingCart()
    const quantity = getItemQuantity(id)
    return (
    <Card className="h-100">
        <div style={{ position: "relative" }}> {/* Added relative position wrapper */}
            <Card.Img 
                variant="top" 
                src={imgUrl} 
                height="200px" 
                style={{ 
                    objectFit: "cover", 
                    cursor: onItemClick ? "pointer" : "default",
                    filter: stock < 1 ? "grayscale(100%)" : "none" // Conditional grayscale
                }}
                onClick={() => onItemClick && onItemClick(id)} // Added onClick handler
            />
            {/* New Stock display overlay */}
            <div style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                padding: "2px 8px",
                borderRadius: "4px",
                fontSize: "0.8rem",
                zIndex: 1
            }}>
                Stock: {stock}
            </div>
            {stock < 1 && ( /* Conditional "Sin stock" overlay */
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    padding: '10px',
                    borderRadius: '5px',
                    fontWeight: 'bold',
                    zIndex: 1 
                }}>
                    Sin stock
                </div>
            )}
        </div>
        <Card.Body className="d-flex flex-column">
            <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                <span className="fs-2">{name}</span>
                <span className="ms-2 text-muted">{formatCurrency(price)}</span>
            </Card.Title>
            <div className="mt-auto">
                {quantity === 0? (<Button className="w-100" onClick={() => increaseCartQuantity(id)} disabled={stock < 1}>+ Agregar al carrito</Button>) : 
                <div className="d-flex align-items-center flex-column" style={{ gap: "5rem"}}>
                    <div className="d-flex align-items-center justify-content-center" style={{ gap: "5rem"}}>
                        <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                        <div><span className="fs-3">{quantity}</span> en el carrito</div>
                        
                        <Button onClick={() => increaseCartQuantity(id)} disabled={quantity >= stock}>+</Button>
                    </div>
                    <Button variant="danger" size="sm" onClick={() => removeFromCart(id)}>Remover</Button>
                </div> }
            </div>
        </Card.Body>
    </Card>
    )
}