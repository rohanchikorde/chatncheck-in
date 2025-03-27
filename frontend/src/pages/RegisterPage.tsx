import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button, Card, Container, Form, InputGroup, Stack, Alert } from 'react-bootstrap';

interface FormError {
  message: string;
  details?: Record<string, string>;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone: ''
  });
  const [formErrors, setFormErrors] = useState<FormError | null>(null);
  const { register, error, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear any previous errors
    setFormErrors(null);

    try {
      await register({
        ...formData,
        role: 'client_coordinator'
      });
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
      setFormErrors(error);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Card style={{ width: '30rem' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Register</h2>
          
          {formErrors && (
            <>
              <Alert variant="danger" className="mb-3">
                {formErrors.message}
              </Alert>
              {formErrors.details && Object.entries(formErrors.details).map(([field, message]) => (
                <Alert key={field} variant="danger" className="mb-2">
                  <strong>{field.replace('_', ' ').toUpperCase()}:</strong> {message}
                </Alert>
              ))}
            </>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="firstName" className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="lastName" className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Form.Text className="text-muted">
                Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="phone" className="mb-3">
              <Form.Label>Phone Number (optional)</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </Button>
              <Button variant="link" onClick={() => navigate('/login')}>
                Already have an account? Login
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
