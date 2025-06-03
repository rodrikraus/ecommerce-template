import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

type CheckoutModalProps = {
  show: boolean;
  handleClose: () => void;
  handleSubmit: (email: string, address: string) => Promise<void>; // Changed to Promise for async handling
  isSubmitting: boolean; // New prop for loading state
};

export function CheckoutModal({ show, handleClose, handleSubmit, isSubmitting }: CheckoutModalProps) {
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [validated, setValidated] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    await handleSubmit(email, address); // Await the submission
    // Only reset fields if submission was successful (or handle errors appropriately)
    // For now, assuming handleSubmit will manage modal closure on success
    // Resetting fields here might clear them before user sees an error message if modal isn't closed by handleSubmit
    // setEmail('');
    // setAddress('');
    // setValidated(false);
  };

  const onModalClose = () => {
    if (isSubmitting) return; // Prevent closing while submitting
    setEmail('');
    setAddress('');
    setValidated(false);
    handleClose();
  }

  return (
    <Modal show={show} onHide={onModalClose} centered backdrop={isSubmitting ? "static" : true} keyboard={!isSubmitting}>
      <Modal.Header closeButton={!isSubmitting}>
        <Modal.Title>Checkout</Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAddress">
            <Form.Label>Shipping Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter shipping address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              disabled={isSubmitting}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a shipping address.
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onModalClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : 'Submit Order'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
