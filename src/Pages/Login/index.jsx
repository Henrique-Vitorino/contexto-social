import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { firebase_app } from "../../Config/Config"
import { useAuth } from "../../Context/auth"
import { useLoadingContext } from "../../Context/loading"
import { LoginFormContainer } from "./styles"

function Login() {
  const navigate = useNavigate()
  const { login, setLogin, setData } = useAuth()
  const { setLoading } = useLoadingContext()


  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  useEffect(() => {
    if (login) {
      navigate('/plataforma/painel')
    }
  }, [login])

  async function userLogin(email, senha) {
    setLoading(true)
    try {
      const res = await firebase_app.auth().signInWithEmailAndPassword(email, senha)
      console.log(res)
      setData(res.user)
      setLogin(true)
    } catch (e) {
      toast.error('Email ou senha invalidos.')
    }
    setLoading(false)
  }


  return (
    <Container>
      <Row style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
        <Col>
          <LoginFormContainer>
            <h4 className="mb-5">Plataforma Casa da Oração</h4>
            <label htmlFor='email'>Endereço de email</label>
            <input className="mb-4" id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <label htmlFor='senha'>Senha</label>
            <input className="mb-4" id='senha' type='password' value={senha} onChange={(e) => setSenha(e.target.value)}></input>
            <Button className="mb-2" onClick={() => userLogin(email, senha)}>Entrar</Button>
            <p style={{fontSize:'26px'}}> <Link to='/'>Voltar</Link></p>
          </LoginFormContainer>
        </Col>
      </Row>
    </Container>
  )
}

export default Login