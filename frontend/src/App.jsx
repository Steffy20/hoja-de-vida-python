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

  useEffect(() => {
    axios.get('/api/cv/')
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
      };

      html2pdf().set(opt).from(element).save(filename).then(() => {
        setIsPrinting(false);
        setPrintingSections([]);
      }).catch(err => {
        console.error('Error generating PDF:', err);
        setIsPrinting(false);
        setPrintingSections([]);
      });
    }, 1500);
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!cvData) return <div>No hay datos disponibles.</div>;

  return (
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
  );
}

export default App;
