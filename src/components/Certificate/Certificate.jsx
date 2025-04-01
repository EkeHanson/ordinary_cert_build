import React, { useContext, useEffect } from 'react';
import { CertificateContext } from '../../contexts/CertificateContext';
import DraggableElement from '../UI/DraggableElement';
import BarcodeGenerator from './BarcodeGenerator';
import './Certificate.css';

// Import template images
import classicTemplate from '../../assets/templates/classic.jpg';
import modernTemplate from '../../assets/templates/modern.jpg';
import elegantTemplate from '../../assets/templates/elegant.png';
import minimalTemplate from '../../assets/templates/minimal.jpg';

const Certificate = () => {
  const { certificate } = useContext(CertificateContext);
  const { 
    title, 
    recipientName, 
    courseName, 
    date, 
    signatures, 
    logos, 
    barcodeData,
    template = 'classic', 
    templateImage,
    backgroundColor,
    borderColor,
    borderWidth,
    borderStyle
  } = certificate;

  // Debug signatures
  useEffect(() => {
    console.log('Current signatures:', signatures);
  }, [signatures]);

  // Map template IDs to their image files
  const templateImages = {
    classic: classicTemplate,
    modern: modernTemplate,
    elegant: elegantTemplate,
    minimal: minimalTemplate
  };

  // Use custom template if available, otherwise use predefined
  const backgroundImage = templateImage || templateImages[template];

  const certificateStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: backgroundColor || 'transparent',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    border: `${borderWidth || '15px'} ${borderStyle || 'solid'} ${borderColor || '#f1c40f'}`,
    boxSizing: 'border-box'
  };

  return (
    <div className="certificate-wrapper">
      <div className="certificate-template" style={certificateStyle}>
        <div className="certificate-content">
          <h1 className="certificate-title">{title}</h1>
          <p className="certificate-text">This is to certify that</p>
          <h2 className="recipient-name">{recipientName || "[Recipient Name]"}</h2>
          <p className="certificate-text">has successfully completed the course</p>
          <h3 className="course-name">{courseName || "[Course Name]"}</h3>
          <p className="certificate-text">on this {date}</p>
          
          <div className="signatures-container">
            {signatures.map((sig, index) => {
              // Ensure default position is within visible area
              const defaultPos = sig.position || { 
                x: 50 + (index * 200), 
                y: 400 
              };
              
              return (
                <DraggableElement 
                  key={`sig-${index}`} 
                  id={`signature-${index}`} 
                  defaultPosition={defaultPos}
                  bounds="parent"
                >
                  <div className="signature-box">
                    {sig.image ? (
                      <img 
                        src={sig.image} 
                        alt="Signature" 
                        className="signature-image"
                        onError={(e) => {
                          e.target.src = '';
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="signature-placeholder">No Signature</div>
                    )}
                    <p className="signature-name">{sig.name || "[Name]"}</p>
                    <p className="signature-date">{sig.date || "[Date]"}</p>
                  </div>
                </DraggableElement>
              );
            })}
          </div>
        </div>

        {/* Logos */}
        {logos.length > 0 && (
          <>
            <DraggableElement id="logo-0" defaultPosition={logos[0]?.position || { x: 50, y: 50 }}>
              <img src={logos[0]?.image} alt="Logo 1" className="certificate-logo" />
            </DraggableElement>
            {logos[1] && (
              <DraggableElement id="logo-1" defaultPosition={logos[1]?.position || { x: '80%', y: 50 }}>
                <img src={logos[1]?.image} alt="Logo 2" className="certificate-logo" />
              </DraggableElement>
            )}
            {logos[2] && (
              <DraggableElement id="logo-2" defaultPosition={logos[2]?.position || { x: 50, y: '80%' }}>
                <img src={logos[2]?.image} alt="Logo 3" className="certificate-logo" />
              </DraggableElement>
            )}
          </>
        )}

        {/* Barcode */}
        <div className="barcode-container">
          <BarcodeGenerator data={barcodeData} />
        </div>


        
      </div>
    </div>
  );
};

export default Certificate;