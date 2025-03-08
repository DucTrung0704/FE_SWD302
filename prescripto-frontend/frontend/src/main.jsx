import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './context/AppContext.jsx'
import UserContextProvider from './context/UserContext.jsx'
import { ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserContextProvider>
      <AppContextProvider>
        <App />
        <ToastContainer />
      </AppContextProvider>
    </UserContextProvider>
  </BrowserRouter>,
)
