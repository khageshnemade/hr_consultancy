import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import { store } from "../redux/store.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import from React Query
const queryClient = new QueryClient();


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>

      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>,

  </StrictMode>,
)
