import { Container, Navbar, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './header.scss';
export default function Header() {
    const location = useLocation();
    return (
        <>
            <Navbar className='mb-sm-3 mt-sm-3' bg="dark" variant="dark">
                <Container className='align-items-center'>
                    <Navbar.Brand href="/">Weather Forecast</Navbar.Brand>
                    <Nav className="me-end">
                        {location.pathname !== '/' && <Nav.Link href="/">Anasayfaya Dön</Nav.Link>}
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}
