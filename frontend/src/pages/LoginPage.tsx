import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button, Card, Container, Form, InputGroup, Stack, Alert } from 'react-bootstrap';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Card style={{ width: '30rem' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          
          {error && (
            <>
              <Alert variant="danger" className="mb-3">
                {error.message}
              </Alert>
              {error.details && Object.entries(error.details).map(([field, message]) => (
                <Alert key={field} variant="danger" className="mb-2">
                  <strong>{field.replace('_', ' ').toUpperCase()}:</strong> {message}
                </Alert>
              ))}
            </>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading} className="w-100">
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Form>

          <Stack direction="horizontal" gap={2} className="mt-3 justify-content-center">
            <span>Don't have an account?</span>
            <Button variant="link" onClick={() => navigate('/register')}>
              Register
            </Button>
          </Stack>
        </Card.Body>
      </Card>
    </Container>
  );
}
