
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../Context/auth';
import PageTitle from '../../Components/PageTitle';
function Painel() {


  return (

    <Container>

      <Row className="mt-4">
        <Col>
          <PageTitle>Atalhos</PageTitle>
        </Col>
      </Row>
      <Row>
        <Col md={4} className='mb-sm-4'>
          <Card >
            <Card.Body>
              <Card.Title>Gerenciar Eventos</Card.Title>
            </Card.Body>
            <Card.Footer>
              <Link to="/plataforma/eventos">
                <Button>Acessar</Button>
              </Link>
            </Card.Footer>
          </Card>
        </Col>
        {/* <Col md={4} className='mb-sm-4'>
          <Card >
            <Card.Body>
              <Card.Title>Gerenciar Colaboradores</Card.Title>
            </Card.Body>
            <Card.Footer>
              <Link to="/plataforma/colaboradores">
                <Button>Acessar</Button>
              </Link>
            </Card.Footer>
          </Card>
        </Col> */}
      </Row>
    </Container >
  )
}

export default Painel