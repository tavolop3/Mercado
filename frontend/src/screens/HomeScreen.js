import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function HomeScreen() {
    return <div> 
        <Navbar bg="light" expand="lg">
            <Container>
            <Navbar.Brand href="#home">Mercado</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link href="/users/registration">Register</Nav.Link>
                <Nav.Link href="/users/login">Login</Nav.Link>
                <NavDropdown title="Cuenta" id="basic-nav-dropdown" >
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                    Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                    Separated link
                    </NavDropdown.Item>
                </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>    
    </div>
}

export default HomeScreen;