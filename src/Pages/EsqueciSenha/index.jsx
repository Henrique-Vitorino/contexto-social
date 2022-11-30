import { useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { firebase_app } from "../../Config/Config"
import { useLoadingContext } from "../../Context/loading"
import { LoginFormContainer } from "./styles"

function EsqueciSenha() {
  const { setLoading } = useLoadingContext()

  const [email, setEmail] = useState('')

  async function recoverPassword(email) {
    setLoading(true)
    try {
      const res = await firebase_app.auth().sendPasswordResetEmail(email)
      toast.success('Verifique a sua caixa de entrada!')
    } catch (e) {
      toast.error('Email nvalido.')
    }
    setLoading(false)
  }


  return (
    <Container>
      <Row style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
        <Col>
          <LoginFormContainer>
            <h4 className="mb-5">Recuperar senha</h4>
            <label htmlFor='email'>Endereço de email</label>
            <input className="mb-4" id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <Button className="mb-2" onClick={() => recoverPassword(email)}>Recuperar senha</Button>
            <p><Link to='/'>Acessar conta</Link></p>
          </LoginFormContainer>
        </Col>
      </Row>
    </Container>
  )
}

export default EsqueciSenha