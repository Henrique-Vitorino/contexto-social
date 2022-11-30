import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../Context/auth';
import Logo from '../../../../assets/logo192.png'
import { useIsClient } from '../../../../Context/isClient';

import { CalendarIcon, EnterIcon, ExitIcon, PersonIcon } from '@radix-ui/react-icons'

function Header() {
  const { data, setLogin, login } = useAuth()

  console.log(data)
  function logout() {
    setLogin(false)
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="secondary" variant="dark">
      < Container >
        <Navbar.Brand ><Link to='/' style={{ color: '#fff', textDecoration: 'none', }}>Casa da Oração</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {
              login ?
                <>
                  <Nav.Link ><Link to='/plataforma/eventos' style={{ color: '#fff', textDecoration: 'none', margin: 0 }}>Gerenciar eventos <CalendarIcon /></Link> </Nav.Link>
                  {/* <Nav.Link ><Link to='/plataforma/colaboradores' style={{ color: '#fff', textDecoration: 'none', margin: 0 }}>Gerenciar colaboradores <PersonIcon /></Link> </Nav.Link> */}
                </>
                :
                ''
            }
          </Nav>
          <Nav>
            {
              login ?
                <Nav.Link onClick={logout} ><p style={{ color: '#fff', textDecoration: 'none', margin: 0 }}>Sair <ExitIcon /></p> </Nav.Link>
                :
                <Nav.Link  ><Link to='/login' style={{ color: '#fff', textDecoration: 'none', }}>Entrar <EnterIcon /></Link> </Nav.Link>

            }
          </Nav>
        </Navbar.Collapse>
      </Container >
    </Navbar >
  )
}

export default Header;