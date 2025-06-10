import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

type CheckoutModalProps = {
  show: boolean;
  handleClose: () => void;
  handleSubmit: (email: string, address: string, numeroCelular: string) => Promise<void>; // Changed to Promise for async handling
  isSubmitting: boolean; // New prop for loading state
};

export function CheckoutModal({ show, handleClose, handleSubmit, isSubmitting }: CheckoutModalProps) {
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [numeroCelular, setNumeroCelular] = useState('');
  const [validated, setValidated] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    await handleSubmit(email, address, numeroCelular); // Await the submission
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
    setNumeroCelular('');
    setValidated(false);
    handleClose();
  }

  return (
    <Modal show={show} onHide={onModalClose} centered backdrop={isSubmitting ? "static" : true} keyboard={!isSubmitting}>
      <Modal.Header closeButton={!isSubmitting}>
        <Modal.Title>Ingrese sus datos</Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Dirección de correo electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese su correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAddress">
            <Form.Label>Dirección de envío*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su dirección de envío"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              disabled={isSubmitting}
            />
            <Form.Control.Feedback type="invalid">
              Por favor ingresar una dirección de envío.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
            <Form.Label>Número de celular*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su número de celular"
              value={numeroCelular}
              onChange={(e) => setNumeroCelular(e.target.value)}
              required
              disabled={isSubmitting}
            />
            <Form.Control.Feedback type="invalid">
              Por favor ingresar un número de celular.
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onModalClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Procesando...' : 'Comprar'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
