import React from 'react';
import ReactDOM from 'react-dom';
import 'base/static/css/global.css';
import App from 'base/app';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
