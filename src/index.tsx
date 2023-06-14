import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { AppProvider } from './AppContext';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <Router>
        <App />
      </Router>
    </AppProvider>
  </React.StrictMode>,
);
