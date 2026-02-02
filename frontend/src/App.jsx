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
<<<<<<< HEAD
  const [printingSections, setPrintingSections] = useState([]);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectedSections, setSelectedSections] = useState([]);

  const availableSections = [
    { id: 'inicio', label: 'Información Personal' },
    { id: 'formacion', label: 'Formación Académica' },
    { id: 'experiencia', label: 'Experiencia Laboral' },
    { id: 'cursos', label: 'Cursos y Certificaciones' },
    { id: 'referencias', label: 'Referencias Personales' }
  ];
=======
  const [printMode, setPrintMode] = useState(null); // 'full' o 'section'
  const defaultPdfSections = {
    inicio: true,
    formacion: true,
    experiencia: true,
    cursos: true,
    referencias: true
  };
  const [pdfSections, setPdfSections] = useState(defaultPdfSections);
>>>>>>> d07955a532472cc349855f08a265beab260c6dd7

  useEffect(() => {
    axios.get('/api/cv/')
      .then(response => {
<<<<<<< HEAD
        setCvData(response.data);
=======
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
>>>>>>> d07955a532472cc349855f08a265beab260c6dd7
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching CV data:", err);
        setError("No se pudo cargar la información. Asegúrate de que el servidor backend esté corriendo.");
        setLoading(false);
      });
  }, []);

<<<<<<< HEAD
  const openPrintModal = () => {
    setSelectedSections(availableSections.map(s => s.id));
    setShowPrintModal(true);
  };

  const closePrintModal = () => {
    setShowPrintModal(false);
    setSelectedSections([]);
  };

  const toggleSection = (sectionId) => {
    setSelectedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const toggleAllSections = () => {
    if (selectedSections.length === availableSections.length) {
      setSelectedSections([]);
    } else {
      setSelectedSections(availableSections.map(s => s.id));
    }
  };

  const handleDownloadPDF = () => {
    if (selectedSections.length === 0) {
      alert('Por favor selecciona al menos una sección');
      return;
    }

    setShowPrintModal(false);
    setIsPrinting(true);
    setPrintingSections(selectedSections);

    const sanitizedName = `CV_${cvData.datos_personales.nombres}_${cvData.datos_personales.apellidos}`.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    let filenameSuffix = 'completo';
    
    if (selectedSections.length === 1) {
      filenameSuffix = selectedSections[0];
    } else if (selectedSections.length < availableSections.length) {
      filenameSuffix = 'personalizado';
    }

    const filename = `${sanitizedName}_${filenameSuffix}.pdf`;

    // Esperar a que el DOM se actualice
    setTimeout(() => {
      const element = document.querySelector('.container');
      if (!element) {
        console.error('Container not found');
        setIsPrinting(false);
        setPrintingSections([]);
        return;
      }

      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true, 
          logging: false, 
          letterRendering: true,
          scrollY: 0
        },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
=======
  const handleDownloadPDF = (mode, sectionId) => {
    if (mode === 'full') {
      const hasSelection = Object.values(pdfSections).some(Boolean);
      if (!hasSelection) {
        alert('Selecciona al menos una sección para el PDF.');
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
>>>>>>> d07955a532472cc349855f08a265beab260c6dd7
      };

      html2pdf().set(opt).from(element).save(filename).then(() => {
        setIsPrinting(false);
<<<<<<< HEAD
        setPrintingSections([]);
      }).catch(err => {
        console.error('Error generating PDF:', err);
        setIsPrinting(false);
        setPrintingSections([]);
      });
    }, 1500);
=======
      });
    };

    setIsPrinting(true);
    setPrintMode(mode);

    // Wait for the state to update and DOM to render correctly
    const delay = mode === 'full' ? 1500 : 500;
    setTimeout(() => {
      generatePDF(mode === 'full' ? 'completo' : sectionId);
      setPrintMode(null);
    }, delay);
>>>>>>> d07955a532472cc349855f08a265beab260c6dd7
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!cvData) return <div>No hay datos disponibles.</div>;

  return (
<<<<<<< HEAD
    <>
      <CVModern
        cvData={cvData}
        onOpenPrintModal={openPrintModal}
        isPrinting={isPrinting}
        printingSections={printingSections}
      />

      {/* Overlay de carga mientras se genera el PDF */}
      {isPrinting && (
        <div className="pdf-loading-overlay">
          <div className="pdf-loading-content">
            <div className="pdf-spinner"></div>
            <p>Generando PDF...</p>
          </div>
        </div>
      )}

      {/* Modal de selección de secciones */}
      {showPrintModal && (
        <div className="print-modal-overlay" onClick={closePrintModal}>
          <div className="print-modal" onClick={e => e.stopPropagation()}>
            <div className="print-modal-header">
              <h3>Guardar como PDF</h3>
              <button className="print-modal-close" onClick={closePrintModal}>×</button>
            </div>
            
            <div className="print-modal-body">
              <p className="print-modal-subtitle">Selecciona las secciones que deseas incluir:</p>
              
              <div className="print-modal-select-all">
                <label className="print-checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedSections.length === availableSections.length}
                    onChange={toggleAllSections}
                  />
                  <span className="print-checkbox-custom"></span>
                  <strong>Seleccionar todas</strong>
                </label>
              </div>

              <div className="print-modal-sections">
                {availableSections.map(section => (
                  <label key={section.id} className="print-checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedSections.includes(section.id)}
                      onChange={() => toggleSection(section.id)}
                    />
                    <span className="print-checkbox-custom"></span>
                    {section.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="print-modal-footer">
              <button className="print-modal-btn cancel" onClick={closePrintModal}>
                Cancelar
              </button>
              <button 
                className="print-modal-btn confirm" 
                onClick={handleDownloadPDF}
                disabled={selectedSections.length === 0}
              >
                Descargar PDF ({selectedSections.length} {selectedSections.length === 1 ? 'sección' : 'secciones'})
              </button>
            </div>
          </div>
        </div>
      )}
    </>
=======
    <CVModern
      cvData={cvData}
      onDownloadPDF={handleDownloadPDF}
      isPrinting={isPrinting}
      printMode={printMode}
      pdfSections={pdfSections}
      setPdfSections={setPdfSections}
    />
>>>>>>> d07955a532472cc349855f08a265beab260c6dd7
  );
}

export default App;
