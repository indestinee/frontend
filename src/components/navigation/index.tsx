import {Container, Nav, Navbar} from 'react-bootstrap';

export default function Navigation() {
  return (
    <Navbar bg="light" expand="lg">
      <Container style={{flexDirection: 'row'}}>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/wifi">WiFi</Nav.Link>
            <Nav.Link href="/paste">Paste</Nav.Link>
            <Nav.Link href="/cgi-bin/luci/">Luci</Nav.Link>
            <Nav.Link href="/gl_home.html">GL Home</Nav.Link>
            <Nav.Link href="smb://192.168.8.1/">Samba</Nav.Link>
            <Nav.Link href="/transmission/web/">Transmission</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
