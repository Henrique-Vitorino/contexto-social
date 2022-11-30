import Spinner from 'react-bootstrap/Spinner';

function GlobalLoading() {
  const height = document.getElementById('root').clientHeight
  return (
    <div style={{ position: 'absolute', width: '100vw', height: height, background: '#d9d9d953', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: '10' }}>
      <Spinner animation='border'></Spinner>
    </div>
  )
}

export default GlobalLoading