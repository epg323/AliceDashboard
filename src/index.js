import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Ethertoken from './ethertoken';

ReactDOM.render(<Ethertoken />, document.getElementById('root'));
registerServiceWorker();
