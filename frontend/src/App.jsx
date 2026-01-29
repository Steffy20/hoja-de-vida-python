import React, { useState, useEffect } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import CVModern from './components/CVModern';
import './App.css';

function App() {
  const [cvData, setCvData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/cv/')
      .then(response => {
        setCvData(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching CV data:", err);
        setError("No se pudo cargar la información. Asegúrate de que el servidor backend esté corriendo.");
        setLoading(false);
      });
  }, []);

  const handleDownloadPDF = (mode, sectionId) => {
    const generatePDF = (filenameSuffix) => {
      const element = document.querySelector('.container');
      const sanitizedName = `CV_${cvData.datos_personales.nombres}_${cvData.datos_personales.apellidos}`.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const filename = `${sanitizedName}_${filenameSuffix}.pdf`;

      const opt = {
        margin: 0,
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      html2pdf().set(opt).from(element).save(filename).then(() => {
        if (mode === 'full') setIsPrinting(false);
      });
    };

    if (mode === 'full') {
      setIsPrinting(true);
      // Wait for the state to update and DOM to render all sections
      setTimeout(() => {
        generatePDF('completo');
      }, 800);
    } else {
      // Download current view immediately
      generatePDF(sectionId);
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!cvData) return <div>No hay datos disponibles.</div>;

  return (
    <CVModern
      cvData={cvData}
      onDownloadPDF={handleDownloadPDF}
      isPrinting={isPrinting}
    />
  );
}

export default App;
