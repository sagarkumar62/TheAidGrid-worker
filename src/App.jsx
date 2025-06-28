import React from 'react'
import AppRouter from './routes/AppRouter'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <AppRouter />
      <ToastContainer />

    </div>
  )
}

export default App