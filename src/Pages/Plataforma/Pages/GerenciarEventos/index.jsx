import { useEffect, useState } from "react"
import { Container, Row, Col, Card, Table, Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap"
import { useAuth } from "../../../../Context/auth";
import { useLoadingContext } from "../../../../Context/loading";
import { addDataToCliente, createEvent, deleteEvent, getAllEvents, getCliente, updateEvent } from "../../../../services/cliente.service";
import PageTitle from "../../Components/PageTitle"
import { toast } from 'react-toastify';

import { Cross1Icon, Cross2Icon, Pencil2Icon, PlusCircledIcon, PlusIcon } from '@radix-ui/react-icons'
import dayjs from "dayjs";

function GerenciarEventos() {

  const { setLoading } = useLoadingContext();

  const [showModal, setShowModal] = useState(false);

  const [showModalEdit, setShowModalEdit] = useState(false);


  const [eventoCadastro, setEventoCadastro] = useState({})
  const [eventoEdit, setEventoEdit] = useState({})

  const [escala, setEscala] = useState([])
  const [colaboradores, setColaboradores] = useState([])
  const [colaboradoresEdit, setColaboradoresEdit] = useState([])

  useEffect(() => {
    getEscalas()
  }, [])

  async function addEvento() {
    setLoading(true)
    try {
      await createEvent({ ...eventoCadastro, colaboradores: colaboradores })
      toast.success('Evento cadastrado com sucesso!')
      getEscalas()
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
    setShowModal(false)
    setColaboradores([])
    setEventoCadastro({})
  }

  async function atualizarEvento() {
    setLoading(true)
    try {
      await updateEvent({ ...eventoEdit, colaboradores: colaboradoresEdit, id: eventoEdit.id })
      toast.success('Evento atualizado com sucesso!')
      getEscalas()
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
    setShowModalEdit(false)
    setColaboradoresEdit([])
    setEventoEdit({})
  }

  async function getEscalas() {
    setLoading(true)
    try {
      const res = await getAllEvents()
      console.log(res)
      setEscala(res)

    } catch (e) {
      setEscala([])
    }
    setLoading(false)
  }


  function closeModal() {
    setShowModal(false)
    setColaboradores([])
    setEventoCadastro({})
  }

  function closeModalEdit() {
    setShowModalEdit(false)
    setColaboradoresEdit([])
    setEventoEdit({})
  }

  function addColaboradorFuncao(funcao, i) {
    let newColaborador = colaboradores
    newColaborador[i].funcao = funcao
    setColaboradores(newColaborador)
  }

  function addColaboradorNome(nome, i) {
    let newColaborador = colaboradores
    newColaborador[i].nome = nome
    setColaboradores(newColaborador)
  }


  function editColaboradorFuncao(funcao, i) {
    let newColaborador = [...colaboradoresEdit]
    console.log(newColaborador)
    newColaborador[i].funcao = funcao
    setColaboradoresEdit(newColaborador)
  }

  function editColaboradorNome(nome, i) {
    let newColaborador = [...colaboradoresEdit]
    newColaborador[i].nome = nome
    setColaboradoresEdit(newColaborador)
  }

  async function apagarEvento(id) {
    await deleteEvent(id)
    toast.success('Evento apagado com sucesso!')
    getEscalas()
  }

  function editarEvento(evento) {
    console.log(evento.data)
    setShowModalEdit(true)
    setEventoEdit({ ...evento, data: evento.data })
    setColaboradoresEdit(evento.colaboradores)
  }



  return (
    <Container style={{ height: '100vh' }}>
      <Modal show={showModal} onHide={() => setShowModal(false)} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>
              Nome do evento
            </label>
            <input value={eventoCadastro.nome} onChange={(e) => setEventoCadastro({ ...eventoCadastro, nome: e.target.value })}></input>
            <label>
              Data do evento
            </label>
            <input type='date' value={eventoCadastro.data} onChange={(e) => setEventoCadastro({ ...eventoCadastro, data: e.target.value })}></input>
            <label>
              Horário de início
            </label>
            <input type='time' value={eventoCadastro.inicio} onChange={(e) => setEventoCadastro({ ...eventoCadastro, inicio: e.target.value })}></input>
            <label>
              Horário de fim
            </label>
            <input type='time' value={eventoCadastro.fim} onChange={(e) => setEventoCadastro({ ...eventoCadastro, fim: e.target.value })}></input>
            <label>
              Colaboradores <PlusCircledIcon style={{ cursor: 'pointer', width: '30px', height: '30px' }} onClick={() => setColaboradores([...colaboradores, {}])}></PlusCircledIcon>
            </label>
            {
              colaboradores.map((colaborador, i) => (
                <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }} key={i + 999932}>
                  <div>
                    <p className='text-muted mb-0'>Função</p>
                    <input value={colaborador.funcao} onChange={(e) => addColaboradorFuncao(e.target.value, i)}></input>
                  </div>
                  <div>
                    <p className='text-muted mb-0'>Nome</p>
                    <input value={colaborador.nome} onChange={(e) => addColaboradorNome(e.target.value, i)}></input>
                  </div>
                </div>
              ))
            }
            <label>
              Observações
            </label>
            <textarea type='text' value={eventoCadastro.observacoes} onChange={(e) => setEventoCadastro({ ...eventoCadastro, observacoes: e.target.value })}></textarea>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => closeModal()}>
            Fechar
          </Button>
          <Button variant="primary" onClick={addEvento}>
            Cadastrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModalEdit} onHide={() => setShowModalEdit(false)} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Editar evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>
              Nome do evento
            </label>
            <input value={eventoEdit.nome} onChange={(e) => setEventoEdit({ ...eventoEdit, nome: e.target.value })}></input>
            <label>
              Data do evento
            </label>
            <input type='date' value={eventoEdit.data} onChange={(e) => setEventoEdit({ ...eventoEdit, data: e.target.value })}></input>
            <label>
              Horário de início
            </label>
            <input type='time' value={eventoEdit.inicio} onChange={(e) => setEventoEdit({ ...eventoEdit, inicio: e.target.value })}></input>
            <label>
              Horário de fim
            </label>
            <input type='time' value={eventoEdit.fim} onChange={(e) => setEventoEdit({ ...eventoEdit, fim: e.target.value })}></input>
            <label>
              Colaboradores <PlusCircledIcon style={{ cursor: 'pointer', width: '30px', height: '30px' }} onClick={() => setColaboradoresEdit([...colaboradoresEdit, {}])}></PlusCircledIcon>
            </label>
            {
              colaboradoresEdit.map((colaborador, i) => (
                <div style={{ display: 'flex', gap: '5px' }} key={i + 193912}>
                  <div>
                    <p className='text-muted mb-0'>Função</p>
                    <input value={colaborador.funcao} onChange={(e) => editColaboradorFuncao(e.target.value, i)}></input>
                  </div>
                  <div>
                    <p className='text-muted mb-0'>Nome</p>
                    <input value={colaborador.nome} onChange={(e) => editColaboradorNome(e.target.value, i)}></input>
                  </div>
                </div>
              ))
            }
            <label>
              Observações
            </label>
            <textarea type='text' value={eventoEdit.observacoes} onChange={(e) => setEventoEdit({ ...eventoEdit, observacoes: e.target.value })}></textarea>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => closeModalEdit()}>
            Fechar
          </Button>
          <Button variant="primary" onClick={atualizarEvento}>
            Atualizar
          </Button>
        </Modal.Footer>
      </Modal>
      <Row style={{ display: 'flex', alignItems: 'center' }}>
        <Col>
          <PageTitle>Gerenciar eventos</PageTitle>
        </Col>
        <Col>
          <Button onClick={() => setShowModal(true)}>Cadastrar novo evento</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table responsive>
            <thead>
              <tr>
                <th>Evento</th>
                <th>Data</th>
                <th>Horário de início</th>
                <th>Horário de fim</th>
                <th>Colaboradores</th>
                <th>Observações</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {
                escala.map((e, i) => (
                  <tr key={i + 1002}>
                    <td>{e.nome}</td>
                    <td>{dayjs(e.data).format('DD-MM-YYYY')}</td>
                    <td>{e.inicio}</td>
                    <td>{e.fim}</td>
                    <td>
                      {
                        e.colaboradores.length > 0 && e.colaboradores?.map((colaborador, i) => (
                          <p key={i + 102}><span style={{ fontWeight: 'bold', marginRight: '4px' }}>{colaborador.funcao}:</span>{colaborador.nome}</p>
                        ))
                      }
                    </td>
                    <td>{e.observacoes ?? '-'}</td>
                    <td>
                      <>
                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Editar evento</Tooltip>}>
                          <span className="d-inline-block mx-2 ">
                            <Pencil2Icon onClick={() => editarEvento(e)}></Pencil2Icon>
                          </span>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Apagar evento</Tooltip>}>
                          <span className="d-inline-block">
                            <Cross1Icon onClick={() => apagarEvento(e.id)}></Cross1Icon>
                          </span>
                        </OverlayTrigger>
                      </>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}

export default GerenciarEventos