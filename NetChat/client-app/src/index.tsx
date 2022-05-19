import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


ReactDOM.render(    
    <React.Fragment>
        <ToastContainer position='bottom-right' />
        <BrowserRouter basename='/'>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />           
            </Routes>          
        </BrowserRouter>        
    </React.Fragment>
        
,
document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
