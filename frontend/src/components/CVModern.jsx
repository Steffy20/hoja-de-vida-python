<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React, { useState, useEffect } from 'react';
>>>>>>> d07955a532472cc349855f08a265beab260c6dd7
import perfilCarmen from '../assets/perfil-carmen.png';
import {
    FaHome,
    FaGraduationCap,
    FaBriefcase,
    FaUsers,
<<<<<<< HEAD
    FaDownload,
=======
    FaPrint,
>>>>>>> d07955a532472cc349855f08a265beab260c6dd7
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaCertificate,
    FaExternalLinkAlt
} from 'react-icons/fa';


<<<<<<< HEAD
const CVModern = ({ cvData, onOpenPrintModal, isPrinting, printingSections }) => {
=======
const CVModern = ({ cvData, onDownloadPDF, isPrinting, printMode, pdfSections, setPdfSections }) => {
>>>>>>> d07955a532472cc349855f08a265beab260c6dd7
    const { datos_personales, formacion, experiencia, referencias, cursos } = cvData;
    const [activeSection, setActiveSection] = useState('inicio');

    // Utility function to format dates
    const formatDate = (dateString) => {
        if (!dateString) return 'Presente';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

<<<<<<< HEAD
=======
    const sectionVisibility = cvData.section_visibility || {};
    const isSectionVisible = (id) => sectionVisibility[id] !== false;
    const isPdfSectionEnabled = (id) => {
        if (!pdfSections) return true;
        return pdfSections[id] !== false;
    };
    const togglePdfSection = (id) => {
        if (!setPdfSections) return;
        setPdfSections((prev) => ({
            ...prev,
            [id]: !(prev?.[id] ?? true)
        }));
    };
    const resolveCertUrl = (value) => {
        if (!value) return null;
        if (value.startsWith('http') || value.startsWith('/')) return value;
        return `/static/${value}`;
    };
    const isImageUrl = (url) => /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(url);

>>>>>>> d07955a532472cc349855f08a265beab260c6dd7
    const sections = [
        { id: 'inicio', label: 'Inicio', icon: <FaHome /> },
        { id: 'formacion', label: 'Formación', icon: <FaGraduationCap /> },
        { id: 'experiencia', label: 'Experiencia', icon: <FaBriefcase /> },
        { id: 'cursos', label: 'Cursos', icon: <FaCertificate /> },
        { id: 'referencias', label: 'Referencias', icon: <FaUsers /> }
    ];
<<<<<<< HEAD

    // Verificar si una sección debe mostrarse
    const shouldShowSection = (sectionId) => {
        if (isPrinting) {
            return printingSections.includes(sectionId);
        }
        return activeSection === sectionId;
=======
    const visibleSections = sections.filter((section) => isSectionVisible(section.id));
    const hasPdfSelection = visibleSections.some((section) => isPdfSectionEnabled(section.id));

    useEffect(() => {
        if (!visibleSections.find((section) => section.id === activeSection)) {
            setActiveSection(visibleSections[0]?.id || 'inicio');
        }
    }, [activeSection, visibleSections]);

    const shouldRenderSection = (id) => {
        if (!isSectionVisible(id)) return false;
        if (isPrinting && printMode === 'full') {
            return isPdfSectionEnabled(id);
        }
        return activeSection === id;
>>>>>>> d07955a532472cc349855f08a265beab260c6dd7
    };

    return (
        <div className={`container ${isPrinting ? 'print-mode' : ''}`}>
            {/* Header Card - Siempre visible */}
            <div className="header-card">
                <div className="header-content">
                    <div className="profile-section">
                        <div className="profile-photo-wrapper">
                            <img src={perfilCarmen} alt="Carmen López" className="profile-photo" />
                        </div>
                        <div className="profile-info">
                            <h1>{datos_personales.nombres} {datos_personales.apellidos}</h1>
                            <div className="subtitle">Perfil Profesional</div>
                        </div>
                    </div>

                    <div className="contact-grid">
                        <div className="contact-item-header">
                            <FaEnvelope className="contact-icon" />
                            <strong>Email:</strong>
                            <a href={`mailto:${datos_personales.email}`}>{datos_personales.email}</a>
                        </div>
                        <div className="contact-item-header">
                            <FaPhone className="contact-icon" />
                            <strong>Teléfono:</strong>
                            <span>{datos_personales.telefono}</span>
                        </div>
                        <div className="contact-item-header">
                            <FaMapMarkerAlt className="contact-icon" />
                            <strong>Dirección:</strong>
                            <span>{datos_personales.direccion}</span>
                        </div>
                    </div>
<<<<<<< HEAD
                </div>
            </div>

            {/* Navigation Tabs - Oculto durante impresión */}
            {!isPrinting && (
                <div className="tabs-navigation">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            className={`tab-button ${activeSection === section.id ? 'active' : ''}`}
                            onClick={() => setActiveSection(section.id)}
                        >
                            <span className="tab-icon">{section.icon}</span>
                            <span className="tab-label">{section.label}</span>
                        </button>
                    ))}
                    <button
                        className="tab-button download-full"
                        onClick={onOpenPrintModal}
                    >
                        <span className="tab-icon"><FaDownload /></span>
                        <span className="tab-label">Guardar PDF</span>
                    </button>
                </div>
            )}
=======

                    {!isPrinting && visibleSections.length > 0 && (
                        <div className="pdf-section-toggle">
                            <div className="pdf-toggle-title">
                                <FaPrint /> PDF: incluir secciones
                            </div>
                            <div className="pdf-toggle-grid">
                                {visibleSections.map((section) => (
                                    <label key={section.id} className="pdf-toggle-item">
                                        <input
                                            type="checkbox"
                                            checked={isPdfSectionEnabled(section.id)}
                                            onChange={() => togglePdfSection(section.id)}
                                        />
                                        <span>{section.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="tabs-navigation">
                {visibleSections.map((section) => (
                    <button
                        key={section.id}
                        className={`tab-button ${activeSection === section.id ? 'active' : ''}`}
                        onClick={() => setActiveSection(section.id)}
                    >
                        <span className="tab-icon">{section.icon}</span>
                        <span className="tab-label">{section.label}</span>
                    </button>
                ))}
                <button
                    className="tab-button download-full"
                    onClick={() => onDownloadPDF('full')}
                    disabled={!hasPdfSelection}
                    title={hasPdfSelection ? 'Descargar CV completo' : 'Selecciona al menos una sección para el PDF'}
                >
                    <span className="tab-icon"><FaPrint /></span>
                    <span className="tab-label">CV Completo</span>
                </button>
            </div>
>>>>>>> d07955a532472cc349855f08a265beab260c6dd7

            {/* Content Area */}
            <div className="tab-content">
                {/* Inicio - Datos Personales */}
<<<<<<< HEAD
                {shouldShowSection('inicio') && (
                    <div id="section-inicio" className="fade-in">
                        <div className="print-header">
                            <h2 className="section-title">Información Personal</h2>
=======
                {shouldRenderSection('inicio') && (
                    <div id="section-inicio" className="fade-in">
                        <div className="print-header">
                            <h2 className="section-title">Información Personal</h2>
                            {!isPrinting && (
                                <button onClick={() => onDownloadPDF('section', 'inicio')} className="print-button">
                                    <FaPrint /> Guardar como PDF
                                </button>
                            )}
>>>>>>> d07955a532472cc349855f08a265beab260c6dd7
                        </div>
                        <div className="info-cards">
                            <div className="info-card">
                                <div className="info-card-label">Cédula</div>
                                <div className="info-card-value">{datos_personales.cedula}</div>
                            </div>
                            <div className="info-card">
                                <div className="info-card-label">Estado Civil</div>
                                <div className="info-card-value">{datos_personales.estado_civil}</div>
                            </div>
                            <div className="info-card">
                                <div className="info-card-label">Fecha de Nacimiento</div>
                                <div className="info-card-value">{formatDate(datos_personales.fecha_nacimiento)}</div>
                            </div>
                            <div className="info-card">
                                <div className="info-card-label">Edad</div>
                                <div className="info-card-value">{datos_personales.edad} años</div>
                            </div>
                        </div>

                        <div className="section-card">
<<<<<<< HEAD
                            <h2 className="section-title">Datos de Contacto</h2>
=======
>>>>>>> d07955a532472cc349855f08a265beab260c6dd7
                            <div className="personal-info-grid">
                                <div className="personal-info-item">
                                    <strong>Nombre Completo:</strong>
                                    <span>{datos_personales.nombres} {datos_personales.apellidos}</span>
                                </div>
                                <div className="personal-info-item">
                                    <strong>Correo Electrónico:</strong>
                                    <span>{datos_personales.email}</span>
                                </div>
                                <div className="personal-info-item">
                                    <strong>Teléfono:</strong>
                                    <span>{datos_personales.telefono}</span>
                                </div>
                                <div className="personal-info-item">
                                    <strong>Dirección:</strong>
                                    <span>{datos_personales.direccion}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Formación Académica */}
<<<<<<< HEAD
                {shouldShowSection('formacion') && (
                    <div id="section-formacion" className="section-card fade-in">
                        <div className="print-header">
                            <h2 className="section-title">Formación Académica</h2>
=======
                {shouldRenderSection('formacion') && (
                    <div id="section-formacion" className="section-card fade-in">
                        <div className="print-header">
                            <h2 className="section-title">Formación Académica</h2>
                            {!isPrinting && (
                                <button onClick={() => onDownloadPDF('section', 'formacion')} className="print-button">
                                    <FaPrint /> Guardar como PDF
                                </button>
                            )}
>>>>>>> d07955a532472cc349855f08a265beab260c6dd7
                        </div>

                        {formacion.map((item, index) => (
                            <div key={index} className="timeline-item">
                                <div className="item-header">
                                    <div className="item-title">{item.nivel}</div>
                                    <div className="item-badge">{item.estado}</div>
                                </div>
                                <div className="item-subtitle">{item.institucion}</div>
                                {item.titulo && <div className="item-description">{item.titulo}</div>}
                            </div>
                        ))}
                    </div>
                )}

                {/* Experiencia Laboral */}
<<<<<<< HEAD
                {shouldShowSection('experiencia') && (
                    <div id="section-experiencia" className="section-card fade-in">
                        <div className="print-header">
                            <h2 className="section-title">Experiencia Laboral</h2>
                        </div>

                        {experiencia.map((item, index) => (
                            <div key={index} className="timeline-item">
                                <div className="item-header">
                                    <div className="item-title">{item.cargo}</div>
                                </div>
                                <div className="item-subtitle">{item.empresa}</div>
                                {(item.fecha_inicio || item.fecha_fin) && (
                                    <div className="item-date">
                                        {formatDate(item.fecha_inicio)} - {formatDate(item.fecha_fin)}
                                    </div>
                                )}
                                <div className="item-description">{item.descripcion}</div>
                            </div>
                        ))}
=======
                {shouldRenderSection('experiencia') && (
                    <div id="section-experiencia" className="section-card fade-in">
                        <div className="print-header">
                            <h2 className="section-title">Experiencia Laboral</h2>
                            {!isPrinting && (
                                <button onClick={() => onDownloadPDF('section', 'experiencia')} className="print-button">
                                    <FaPrint /> Guardar como PDF
                                </button>
                            )}
                        </div>

                        {experiencia.map((item, index) => {
                            const certificadoUrl = resolveCertUrl(item.certificado);
                            const isImage = certificadoUrl && isImageUrl(certificadoUrl);
                            return (
                                <div key={index} className="timeline-item">
                                    <div className="item-header">
                                        <div className="item-title">{item.cargo}</div>
                                    </div>
                                    <div className="item-subtitle">{item.empresa}</div>
                                    {(item.fecha_inicio || item.fecha_fin) && (
                                        <div className="item-date">
                                            {formatDate(item.fecha_inicio)} - {formatDate(item.fecha_fin)}
                                        </div>
                                    )}
                                    <div className="item-description">{item.descripcion}</div>
                                    {certificadoUrl && (
                                        <div className="experience-cert">
                                            {isImage ? (
                                                <a
                                                    href={certificadoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="certificate-thumb"
                                                >
                                                    <img src={certificadoUrl} alt="Certificado de experiencia" />
                                                </a>
                                            ) : (
                                                <a
                                                    href={certificadoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="certificate-link"
                                                >
                                                    <FaCertificate /> Ver Certificado <FaExternalLinkAlt size={12} />
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
>>>>>>> d07955a532472cc349855f08a265beab260c6dd7
                    </div>
                )}

                {/* Cursos y Certificaciones */}
<<<<<<< HEAD
                {shouldShowSection('cursos') && (
                    <div id="section-cursos" className="section-card fade-in">
                        <div className="print-header">
                            <h2 className="section-title">Cursos y Certificaciones</h2>
=======
                {shouldRenderSection('cursos') && (
                    <div id="section-cursos" className="section-card fade-in">
                        <div className="print-header">
                            <h2 className="section-title">Cursos y Certificaciones</h2>
                            {!isPrinting && (
                                <button onClick={() => onDownloadPDF('section', 'cursos')} className="print-button">
                                    <FaPrint /> Guardar como PDF
                                </button>
                            )}
>>>>>>> d07955a532472cc349855f08a265beab260c6dd7
                        </div>

                        <div className="courses-grid">
                            {cursos && cursos.map((curso, index) => {
<<<<<<< HEAD
                                const certificadoUrl = curso.certificado
                                    ? (curso.certificado.startsWith('http') || curso.certificado.startsWith('/')
                                        ? curso.certificado
                                        : `/static/${curso.certificado}`)
                                    : null;
                                return (
                                <div key={index} className="course-card">
                                    <div className="course-info">
                                        <div className="course-name">{curso.nombre}</div>
                                        <div className="course-institution">{curso.institucion}</div>
                                        {curso.fecha && <div className="course-date">{formatDate(curso.fecha)}</div>}
                                    </div>
                                    {certificadoUrl && !isPrinting && (
                                        <a
                                            href={certificadoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="certificate-link"
                                        >
                                            <FaCertificate /> Ver Certificado <FaExternalLinkAlt size={12} />
                                        </a>
                                    )}
                                </div>
=======
                                const certificadoUrl = resolveCertUrl(curso.certificado);
                                return (
                                    <div key={index} className="course-card">
                                        <div className="course-info">
                                            <div className="course-name">{curso.nombre}</div>
                                            <div className="course-institution">{curso.institucion}</div>
                                            {curso.fecha && <div className="course-date">{formatDate(curso.fecha)}</div>}
                                        </div>
                                        {certificadoUrl && (
                                            <a
                                                href={certificadoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="certificate-link"
                                            >
                                                <FaCertificate /> Ver Certificado <FaExternalLinkAlt size={12} />
                                            </a>
                                        )}
                                    </div>
>>>>>>> d07955a532472cc349855f08a265beab260c6dd7
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Referencias */}
<<<<<<< HEAD
                {shouldShowSection('referencias') && (
                    <div id="section-referencias" className="section-card fade-in">
                        <div className="print-header">
                            <h2 className="section-title">Referencias Personales</h2>
=======
                {shouldRenderSection('referencias') && (
                    <div id="section-referencias" className="section-card fade-in">
                        <div className="print-header">
                            <h2 className="section-title">Referencias Personales</h2>
                            {!isPrinting && (
                                <button onClick={() => onDownloadPDF('section', 'referencias')} className="print-button">
                                    <FaPrint /> Guardar como PDF
                                </button>
                            )}
>>>>>>> d07955a532472cc349855f08a265beab260c6dd7
                        </div>

                        <div className="references-grid">
                            {referencias.map((ref, index) => (
                                <div key={index} className="reference-card">
                                    <div className="reference-name">{ref.nombre}</div>
                                    <div className="reference-detail">{ref.telefono}</div>
                                    {ref.email && <div className="reference-detail">{ref.email}</div>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
<<<<<<< HEAD
        </div>
=======
        </div >
>>>>>>> d07955a532472cc349855f08a265beab260c6dd7
    );
};

export default CVModern;
