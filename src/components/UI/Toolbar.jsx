import React, { useContext } from 'react';
import  {CertificateContext}  from '../../contexts/CertificateContext';
import { FaFileAlt, FaDownload, FaUndo, FaRedo, FaSave, FaShareAlt } from 'react-icons/fa';
import './Toolbar.css';

const Toolbar = () => {
  const { certificate, updateCertificate } = useContext(CertificateContext);

  const handleNewCertificate = () => {
    if (window.confirm('Are you sure you want to create a new certificate? All current changes will be lost.')) {
      updateCertificate({
        title: "Certificate of Completion",
        recipientName: "",
        courseName: "",
        date: new Date().toLocaleDateString(),
        signatures: [],
        logos: [],
        template: "classic",
        barcodeData: "https://cmvp.net/verification/4b832a6e-bba1-4e15-b7d5-6da5657512f0/ARTS/"
      });
    }
  };

  const handleSave = () => {
    // In a real app, this would save to a database or local storage
    localStorage.setItem('certificateData', JSON.stringify(certificate));
    alert('Certificate saved successfully!');
  };

  const handleLoad = () => {
    const savedData = localStorage.getItem('certificateData');
    if (savedData) {
      if (window.confirm('Load saved certificate? Current changes will be lost.')) {
        updateCertificate(JSON.parse(savedData));
      }
    } else {
      alert('No saved certificate found');
    }
  };

  const handleShare = () => {
    // This would be more sophisticated in a real app
    alert('Share functionality would be implemented here');
  };

  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <h1 className="app-title">Certificate Builder</h1>
      </div>
      
      <div className="toolbar-center">
        <button className="toolbar-button" onClick={handleNewCertificate}>
          <FaFileAlt className="toolbar-icon" />
          <span>New</span>
        </button>
        
        <button className="toolbar-button" onClick={handleSave}>
          <FaSave className="toolbar-icon" />
          <span>Save</span>
        </button>
        
        <button className="toolbar-button" onClick={handleLoad}>
          <FaFileAlt className="toolbar-icon" />
          <span>Load</span>
        </button>
        
        <button className="toolbar-button" disabled>
          <FaUndo className="toolbar-icon" />
          <span>Undo</span>
        </button>
        
        <button className="toolbar-button" disabled>
          <FaRedo className="toolbar-icon" />
          <span>Redo</span>
        </button>
      </div>
      
      <div className="toolbar-right">
        <button className="toolbar-button primary" onClick={handleShare}>
          <FaShareAlt className="toolbar-icon" />
          <span>Share</span>
        </button>
        
        <button className="toolbar-button primary">
          <FaDownload className="toolbar-icon" />
          <span>Export</span>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;