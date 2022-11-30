import { useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { firebase_app } from "../../Config/Config"
import { useLoadingContext } from "../../Context/loading"
import { LoginFormContainer } from "./styles"


function Signup() {
  const { setLoading } = useLoadingContext()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  async function createAccount() {
    setLoading(true)
    try {
      await firebase_app.auth().createUserWithEmailAndPassword(email, senha)
      toast.success('Conta criada com sucesso!')
      navigate('/')
    } catch (e) {
      toast.error("Tivemos um problema, tente novamente mais tarde.")
    }
    setLoading(false)
  }

  return (
    <Container>
      <Row style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
        <Col>
          <LoginFormContainer>
            <h4 className="mb-5">Crie sua conta no brokers HCB</h4>
            <label htmlFor='email'>Endereço de email</label>
            <input className="mb-4" id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <label htmlFor='senha'>Senha</label>
            <input className="mb-4" id='senha' type='password' value={senha} onChange={(e) => setSenha(e.target.value)}></input>
            <Button className="mb-2" onClick={createAccount}>Criar conta</Button>
            <p>Já possui conta? <Link to='/'>Acessar conta</Link></p>
          </LoginFormContainer>
        </Col>
      </Row>
    </Container>
  )
}

export default Signup