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
  const [printMode, setPrintMode] = useState(null); // 'full' o 'section'
  const defaultPdfSections = {
    inicio: true,
    formacion: true,
    experiencia: true,
    cursos: true,
    referencias: true
  };
  const [pdfSections, setPdfSections] = useState(defaultPdfSections);

  useEffect(() => {
    axios.get('/api/cv/')
      .then(response => {
        const data = response.data;
        const visibility = data.section_visibility || {};
        const initialPdfSections = { ...defaultPdfSections };
        Object.keys(initialPdfSections).forEach((key) => {
          if (visibility[key] === false) {
            initialPdfSections[key] = false;
          }
        });
        setPdfSections(initialPdfSections);
        setCvData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching CV data:", err);
        setError("No se pudo cargar la informacion. Asegurate de que el servidor backend este corriendo.");
        setLoading(false);
      });
  }, []);

  const handleDownloadPDF = (mode, sectionId) => {
    if (mode === 'full') {
      const hasSelection = Object.values(pdfSections).some(Boolean);
      if (!hasSelection) {
        alert('Selecciona al menos una seccion para el PDF.');
        return;
      }
    }

    const generatePDF = (filenameSuffix) => {
      const element = document.querySelector('.container');
      const fullName = cvData?.datos_personales
        ? `${cvData.datos_personales.nombres}_${cvData.datos_personales.apellidos}`
        : 'cv';
      const sanitizedName = `CV_${fullName}`.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const filename = `${sanitizedName}_${filenameSuffix}.pdf`;

      const opt = {
        margin: 0,
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: true, letterRendering: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      html2pdf().set(opt).from(element).save(filename).then(() => {
        setIsPrinting(false);
      });
    };

    setIsPrinting(true);
    setPrintMode(mode);

    const delay = mode === 'full' ? 1500 : 500;
    setTimeout(() => {
      generatePDF(mode === 'full' ? 'completo' : sectionId);
      setPrintMode(null);
    }, delay);
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!cvData) return <div>No hay datos disponibles.</div>;

  return (
    <CVModern
      cvData={cvData}
      onDownloadPDF={handleDownloadPDF}
      isPrinting={isPrinting}
      printMode={printMode}
      pdfSections={pdfSections}
      setPdfSections={setPdfSections}
    />
  );
}

export default App;
