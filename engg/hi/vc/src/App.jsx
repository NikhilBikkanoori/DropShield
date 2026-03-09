import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { NotificationProvider } from './context/NotificationContext';
import './styles/index.css';
import './styles/tailwind.css';

const App = () => {
  return (
    <Router>
      <NotificationProvider>
        <AppRoutes />
      </NotificationProvider>
    </Router>
  );
};

export default App;