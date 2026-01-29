import React, { useState } from 'react';
import perfilCarmen from '../assets/perfil-carmen.png';
import {
    FaHome,
    FaGraduationCap,
    FaBriefcase,
    FaUsers,
    FaPrint,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt
} from 'react-icons/fa';


const CVModern = ({ cvData, onDownloadPDF, isPrinting }) => {
    const { datos_personales, formacion, experiencia, referencias } = cvData;
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

    const sections = [
        { id: 'inicio', label: 'Inicio', icon: <FaHome /> },
        { id: 'formacion', label: 'Formación', icon: <FaGraduationCap /> },
        { id: 'experiencia', label: 'Experiencia', icon: <FaBriefcase /> },
        { id: 'referencias', label: 'Referencias', icon: <FaUsers /> }
    ];

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
                </div>
            </div>

            {/* Navigation Tabs */}
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
                    onClick={() => onDownloadPDF('full')}
                >
                    <span className="tab-icon"><FaPrint /></span>
                    <span className="tab-label">CV Completo</span>
                </button>
            </div>

            {/* Content Area */}
            <div className="tab-content">
                {/* Inicio - Datos Personales */}
                {(activeSection === 'inicio' || isPrinting) && (
                    <div id="section-inicio" className="fade-in">
                        <div className="print-header">
                            <h2 className="section-title">Información Personal</h2>
                            {!isPrinting && (
                                <button onClick={() => onDownloadPDF('section', 'inicio')} className="print-button">
                                    <FaPrint /> Guardar como PDF
                                </button>
                            )}
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
                            <h2 className="section-title">Información Personal</h2>
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
                {(activeSection === 'formacion' || isPrinting) && (
                    <div id="section-formacion" className="section-card fade-in">
                        <div className="print-header">
                            <h2 className="section-title">Formación Académica</h2>
                            {!isPrinting && (
                                <button onClick={() => onDownloadPDF('section', 'formacion')} className="print-button">
                                    <FaPrint /> Guardar como PDF
                                </button>
                            )}
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
                {(activeSection === 'experiencia' || isPrinting) && (
                    <div id="section-experiencia" className="section-card fade-in">
                        <div className="print-header">
                            <h2 className="section-title">Experiencia Laboral</h2>
                            {!isPrinting && (
                                <button onClick={() => onDownloadPDF('section', 'experiencia')} className="print-button">
                                    <FaPrint /> Guardar como PDF
                                </button>
                            )}
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
                    </div>
                )}

                {/* Referencias */}
                {(activeSection === 'referencias' || isPrinting) && (
                    <div id="section-referencias" className="section-card fade-in">
                        <div className="print-header">
                            <h2 className="section-title">Referencias Personales</h2>
                            {!isPrinting && (
                                <button onClick={() => onDownloadPDF('section', 'referencias')} className="print-button">
                                    <FaPrint /> Guardar como PDF
                                </button>
                            )}
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
        </div>
    );
};

export default CVModern;
