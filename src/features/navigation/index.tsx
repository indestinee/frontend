import {Container, Nav, Navbar} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {currentBranch, Branch} from '../../utils/branch/currentBranch';
import {isWindows} from '../../utils/client';
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
            {
              currentBranch == Branch.ROUTER &&
              <>
                <NavLink className="nav-link" to="/wifi">WiFi</NavLink>
                <NavLink className="nav-link" to="/paste">Paste</NavLink>
                <Nav.Link href="/cgi-bin/luci/">Luci</Nav.Link>
                <Nav.Link href="/gl_home.html">GL Home</Nav.Link>
                <Nav.Link href={isWindows()? '\\\\192.168.8.1' : 'smb://192.168.8.1/'}>Samba</Nav.Link>
                <Nav.Link href="/transmission/web/">Transmission</Nav.Link>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
