import { Button, Col, Container, Row, Table } from "react-bootstrap"
import Header from "../Plataforma/Components/Header"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getEscataByDay } from "../../services/cliente.service";
import { useLoadingContext } from "../../Context/loading";
import { toast } from "react-toastify";
function Home() {

  const [dataPesquisa, setDataPesquisa] = useState(new Date());
  const [dataCalendario, setDataCalendario] = useState(new Date());

  const [escala, setEscala] = useState([])

  const { setLoading } = useLoadingContext()
  const [lista, setLista] = useState()

  async function getEscalas(data) {
    console.log(dayjs(data).format('YYYY-MM-DD').toString())
    setLoading(true)
    console.log(data)
    try {
      const res = await getEscataByDay(dayjs(data).format('YYYY-MM-DD').toString())
      console.log(res)
      setEscala(res)

    } catch (e) {
      console.log(e)
      toast.error('Sem eventos encontrados nesse dia')
      setEscala([])
    }
    setLoading(false)
  }
  return (
    <>
      <Header></Header>
      <Container>
        <Row className='mt-4'>
          <Col>
            <h3 className="mb-4">Selecione a data para consultar a escala</h3>
            <Calendar value={dataCalendario} onChange={(e) => {
              setDataPesquisa(dayjs(e).format('YYYY-MM-DD'))
              setDataCalendario(e)
            }} />
            <Button className='mt-4' size='lg' variant="primary" onClick={() => getEscalas(dataPesquisa)}>Consultar Escala</Button>
          </Col>
        </Row>
        <Row className='mt-4'>
          <Col >
            <Table responsive>
              <thead>
                <tr>
                  <th>Evento</th>
                  <th>Data</th>
                  <th>Horário de início</th>
                  <th>Horário de fim</th>
                  <th>Colaboradores</th>
                  <th>Observações</th>
                </tr>
              </thead>
              <tbody>
                {
                  escala.map((e) => (
                    <tr>
                      <td>{e.nome}</td>
                      <td>{dayjs(e.data).format('DD-MM-YYYY')}</td>
                      <td>{e.inicio}</td>
                      <td>{e.fim}</td>
                      <td>
                        {
                          e.colaboradores.length > 0 && e.colaboradores?.map((colaborador) => (
                            <p><span style={{ fontWeight: 'bold', marginRight: '4px' }}>{colaborador.funcao}:</span>{colaborador.nome}</p>
                          ))
                        }
                      </td>
                      <td>{e.observacoes ?? '-'}</td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Home