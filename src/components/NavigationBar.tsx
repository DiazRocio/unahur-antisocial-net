import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoAntiSocial from '../assets/ANTI-SOCIALNET.jpeg';

export default function NavigationBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="bg-white border-bottom shadow-sm sticky-top py-2">
      <Container style={{ maxWidth: '900px' }}>
        <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center gap-2 text-dark">
          <img
            src={logoAntiSocial}
            alt="Logo"
            width="38"
            height="38"
            className="rounded-circle object-fit-cover shadow-sm"
          />
          <span style={{ fontSize: '1.1rem' }}>UnaHur Anti-Social Net</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center gap-3">
            <Nav.Link as={Link} to="/" className="fw-medium text-secondary">
              Home
            </Nav.Link>
            
            {user ? (
              <>
                <Nav.Link as={Link} to="/create-post" className="btn btn-primary text-white px-3 py-1.5 rounded-pill btn-sm">
                  Crear Post
                </Nav.Link>
                <Nav.Link as={Link} to="/profile" className="fw-bold text-dark">
                  @{user.nickName}
                </Nav.Link>
                <Button 
                  variant="outline-danger" 
                  size="sm" 
                  className="rounded-pill px-3"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="text-dark fw-medium">Iniciar Sesión</Nav.Link>
                <Nav.Link as={Link} to="/register" className="btn btn-primary text-white px-3 rounded-pill btn-sm">
                  Registrarse
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}