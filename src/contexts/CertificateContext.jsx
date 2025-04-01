import { createContext, useState, useCallback } from 'react';

export const CertificateContext = createContext();

export const CertificateProvider = ({ children }) => {
  const [certificate, setCertificate] = useState({
    title: "Certificate of Completion",
    recipientName: "",
    courseName: "",
    date: new Date().toLocaleDateString(),
    signatures: [],
    logos: [],
    templateImage: null, 
    template: "classic",
    barcodeData: "https://cmvp.net/verification/4b832a6e-bba1-4e15-b7d5-6da5657512f0/ARTS/"
  });

  const updateCertificate = useCallback((updates) => {
    setCertificate(prev => ({ ...prev, ...updates }));
  }, []);

  const addSignature = useCallback((signature) => {
    setCertificate(prev => ({
      ...prev,
      signatures: [...prev.signatures, signature]
    }));
  }, []);

  const updateSignature = useCallback((index, updates) => {
    setCertificate(prev => {
      const updatedSignatures = [...prev.signatures];
      updatedSignatures[index] = { ...updatedSignatures[index], ...updates };
      return { ...prev, signatures: updatedSignatures };
    });
  }, []);

  const removeSignature = useCallback((index) => {
    setCertificate(prev => ({
      ...prev,
      signatures: prev.signatures.filter((_, i) => i !== index)
    }));
  }, []);

  const addLogo = useCallback((logo) => {
    setCertificate(prev => ({
      ...prev,
      logos: [...prev.logos, logo]
    }));
  }, []);

  const updateLogo = useCallback((index, updates) => {
    setCertificate(prev => {
      const updatedLogos = [...prev.logos];
      updatedLogos[index] = { ...updatedLogos[index], ...updates };
      return { ...prev, logos: updatedLogos };
    });
  }, []);

  const removeLogo = useCallback((index) => {
    setCertificate(prev => ({
      ...prev,
      logos: prev.logos.filter((_, i) => i !== index)
    }));
  }, []);

  return (
    <CertificateContext.Provider value={{
      certificate,
      updateCertificate,
      addSignature,
      updateSignature,
      removeSignature,
      addLogo,
      updateLogo,
      removeLogo
    }}>
      {children}
    </CertificateContext.Provider>
  );
};