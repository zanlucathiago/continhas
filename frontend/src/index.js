import axios from 'axios';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const DEFAULT_TIMEOUT = process.env.NODE_ENV === 'development' ? 1414 : 0

const handleTimeout = (data, callback) => () => callback(data)

const resolvePromise = ({ data }) => resolve => setTimeout(handleTimeout(data, resolve), DEFAULT_TIMEOUT)

const rejectPromise = (error) => (_resolve, reject) => setTimeout(handleTimeout(error, reject), DEFAULT_TIMEOUT)

const handleResponse = (callback) => (response) => new Promise(callback(response))

axios.interceptors.response.use(handleResponse(resolvePromise), handleResponse(rejectPromise));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
