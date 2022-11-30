import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import GlobalLoading from './components/LoadingScreen';
import { useLoadingContext } from './Context/loading';
import router from './routes/index';

function App() {
  const { loading } = useLoadingContext()
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {
        loading ?
          <GlobalLoading></GlobalLoading>
          : ''
      }
      <RouterProvider router={router} />
    </>
  )
}

export default App
