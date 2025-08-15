import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import App from './App'
import './index.css'
import { store } from './store'
import { AxiosInterceptor } from 'components/AxiosInterceptor'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AxiosInterceptor>
            <App />
          </AxiosInterceptor>
        </BrowserRouter>
      </QueryClientProvider>
      <ToastContainer />
    </Provider>
  </StrictMode>
)
