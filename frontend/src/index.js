import axios from 'axios';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const DEFAULT_TIMEOUT = process.env.NODE_ENV === 'development' ? 1414 : 0

const handleTimeout = (data, callback) => () => callback(data)

const promiseCallback = data => resolve => setTimeout(handleTimeout(data, resolve), DEFAULT_TIMEOUT)

const handleResponse = ({ data }) => new Promise(promiseCallback(data))

axios.interceptors.response.use(handleResponse);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
