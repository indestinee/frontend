import {Container, Nav, Navbar} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import './index.css';

export default function Navigation() {
  return (
    <Navbar bg="light" expand="lg">
      <Container style={{flexDirection: 'row'}}>
        <NavLink className="nav-brand" to="/">Home</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/toolbox">Toolbox</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
