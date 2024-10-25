import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


import { ConnectButton } from './connectButton';
function NavBar() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary navbar" fixed='top'>
            <Container>
                <Navbar.Brand href="/">SOLANA TODO LIST APP</Navbar.Brand>
                <ConnectButton/>
            </Container>
        </Navbar>
    );
}

export default NavBar;