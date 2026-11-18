import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { createUser } from '../services/api';

export default function Register() {
  const [nickName, setNickName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!nickName.trim()) {
      setError('El campo NickName es obligatorio.');
      return;
    }

    setLoading(true);

    try {
      await createUser(nickName.trim());
      
      setSuccess('¡Usuario registrado con éxito! Redirigiendo al login...');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'No se pudo crear el usuario.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card style={{ width: '100%', maxWidth: '400px' }} className="shadow p-4">
        <Card.Body>
          <h2 className="text-center mb-4 fw-bold">Registro</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formRegisterNickName">
              <Form.Label>NickName</Form.Label>
              <Form.Control
                type="text"
                placeholder="Elegí un nickname único"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
              />
              <Form.Text className="text-muted">
                Este nombre será único en la base de datos.
              </Form.Text>
            </Form.Group>

            <Button 
              variant="success" 
              type="submit" 
              className="w-100 mt-3"
              disabled={loading}
            >
              {loading ? 'Registrando...' : 'Registrarse'}
            </Button>
          </Form>

          <div className="text-center mt-3">
            <span className="text-muted">¿Ya tenés cuenta? </span>
            <Link to="/login">Iniciá sesión</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}