
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import store from './redux/store/store.tsx';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';


import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
    <Router>
    <App />
    <Toaster/>
    </Router>
    </Provider>
)
