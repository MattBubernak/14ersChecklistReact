import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import App from './js/components/App';
ReactDOM.render((<App />), document.getElementById('app'));
registerServiceWorker();
