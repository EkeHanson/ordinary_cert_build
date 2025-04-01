// App.js
import React from 'react';
import { CertificateProvider } from './contexts/CertificateContext';
import Certificate from './components/Certificate/Certificate';
import CertificateControls from './components/Certificate/CertificateControls';
import BulkCertificateControls from './components/Certificate/BulkCertificateControls';
import Toolbar from './components/UI/Toolbar';
import './App.css';

const App = () => {
  return (
    <CertificateProvider>
      <div className="app-container">
        <Toolbar />
        <div className="main-content">
          <div className="controls-container">
            <CertificateControls />
          </div>
          <div className="preview-container">
            <Certificate />
          </div>
          <div className="bulk-container">
            <BulkCertificateControls />
          </div>
        </div>
      </div>
    </CertificateProvider>
  );
};

export default App;