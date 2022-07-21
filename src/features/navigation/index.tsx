import {Container, Nav, Navbar} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {currentBranch, Branch} from '../../utils/branch/currentBranch';
import navItems from '../../config/nav.json';
import './index.css';

interface NavItemProp {
  name: string,
  link: string,
  branches: Branch[],
  isReact: boolean,
}

const NavItem = ({navItemProp}: {navItemProp: NavItemProp}) => {
  return (navItemProp.isReact) ? (
    <NavLink className="nav-link" to={navItemProp.link}>
      {navItemProp.name}
    </NavLink>
  ) : (
    <Nav.Link href={navItemProp.link}>
      {navItemProp.name}
    </Nav.Link>
  );
};

export default function Navigation() {
  console.log('navItems:', navItems.map((navItemProp) => (
    `${navItemProp.branches.includes(currentBranch.toString())}`+
    `${navItemProp.branches}`+currentBranch
  )));
  return (
    <Navbar bg="light" expand="lg">
      <Container style={{flexDirection: 'row'}}>
        <NavLink className="nav-brand" to="/">Home</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {
              navItems.map((navItemProp) => (
                navItemProp.branches.includes(currentBranch.toString()) &&
                <NavItem
                  key={navItemProp.name}
                  navItemProp={navItemProp as NavItemProp}
                />
              ))
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
