import React, { useRef } from 'react';
import { toPng, toJpeg } from 'html-to-image';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import Certificate from './Certificate';
import { FaTimes, FaDownload, FaFilePdf } from 'react-icons/fa';
import './PreviewModal.css';

const PreviewModal = ({ onClose }) => {
  const certificateRef = useRef(null);

  const downloadCertificate = async (format) => {
    if (!certificateRef.current) return;

    try {
      let dataUrl;
      const options = {
        quality: 0.95,
        pixelRatio: 3, // Higher quality
        backgroundColor: '#ffffff'
      };

      switch (format) {
        case 'png':
          dataUrl = await toPng(certificateRef.current, options);
          saveAs(dataUrl, `certificate-${Date.now()}.png`);
          break;
        case 'jpeg':
          dataUrl = await toJpeg(certificateRef.current, options);
          saveAs(dataUrl, `certificate-${Date.now()}.jpg`);
          break;
        case 'pdf':
          dataUrl = await toPng(certificateRef.current, options);
          const pdf = new jsPDF('landscape');
          const imgProps = pdf.getImageProperties(dataUrl);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          
          pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save(`certificate-${Date.now()}.pdf`);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate certificate image');
    }
  };

  return (
    <div className="preview-modal">
      <div className="preview-content">
        <div className="preview-header">
          <h2>Certificate Preview</h2>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        
        <div className="certificate-container">
          <div className="certificate-preview" ref={certificateRef}>
            <Certificate />
          </div>
        </div>

        <div className="download-options">
          <button 
            className="download-button"
            onClick={() => downloadCertificate('png')}
          >
            <FaDownload /> Download PNG
          </button>
          <button 
            className="download-button"
            onClick={() => downloadCertificate('jpeg')}
          >
            <FaDownload /> Download JPEG
          </button>
          <button 
            className="download-button pdf"
            onClick={() => downloadCertificate('pdf')}
          >
            <FaFilePdf /> Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;