import React, { useState } from 'react';
import perfilCarmen from '../assets/perfil-carmen.png';
import {
    FaHome,
    FaGraduationCap,
    FaBriefcase,
    FaUsers,
    FaDownload,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaCertificate,
    FaExternalLinkAlt,
    FaTrophy,
    FaBook,
    FaProjectDiagram,
    FaStore,
    FaGlobe,
    FaIdCard,
    FaBirthdayCake,
    FaVenusMars,
    FaCar
} from 'react-icons/fa';


const CVModern = ({ cvData, onOpenPrintModal, isPrinting, printingSections }) => {
    const { 
        datos_personales, 
        formacion, 
        experiencia, 
        referencias, 
        cursos,
        reconocimientos = [],
        productos_academicos = [],
        productos_laborales = [],
        ventas_garage = []
    } = cvData;
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
        { id: 'cursos', label: 'Cursos', icon: <FaCertificate /> },
        { id: 'reconocimientos', label: 'Reconocimientos', icon: <FaTrophy />, hideIfEmpty: true },
        { id: 'productos_academicos', label: 'Prod. Académicos', icon: <FaBook />, hideIfEmpty: true },
        { id: 'productos_laborales', label: 'Prod. Laborales', icon: <FaProjectDiagram />, hideIfEmpty: true },
        { id: 'referencias', label: 'Referencias', icon: <FaUsers /> },
        { id: 'ventas_garage', label: 'Venta Garage', icon: <FaStore />, hideIfEmpty: true }
    ];

    // Verificar si una sección tiene datos
    const sectionHasData = (sectionId) => {
        switch(sectionId) {
            case 'reconocimientos': return reconocimientos && reconocimientos.length > 0;
            case 'productos_academicos': return productos_academicos && productos_academicos.length > 0;
            case 'productos_laborales': return productos_laborales && productos_laborales.length > 0;
            case 'ventas_garage': return ventas_garage && ventas_garage.length > 0;
            default: return true;
        }
    };

    // Filtrar secciones visibles (ocultar las vacías que tienen hideIfEmpty)
    const visibleSections = sections.filter(section => 
        !section.hideIfEmpty || sectionHasData(section.id)
    );

    // Verificar si una sección debe mostrarse
    const shouldShowSection = (sectionId) => {
        if (isPrinting) {
            return printingSections.includes(sectionId);
        }
        return activeSection === sectionId;
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
                        {datos_personales.sitio_web && (
                            <div className="contact-item-header">
                                <FaGlobe className="contact-icon" />
                                <strong>Sitio Web:</strong>
                                <a href={datos_personales.sitio_web} target="_blank" rel="noopener noreferrer">
                                    {datos_personales.sitio_web}
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Navigation Tabs - Oculto durante impresión */}
            {!isPrinting && (
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
                        onClick={onOpenPrintModal}
                    >
                        <span className="tab-icon"><FaDownload /></span>
                        <span className="tab-label">Guardar PDF</span>
                    </button>
                </div>
            )}

            {/* Content Area */}
            <div className="tab-content">
                {/* Inicio - Datos Personales */}
                {shouldShowSection('inicio') && (
                    <div id="section-inicio" className="fade-in">
                        <div className="print-header">
                            <h2 className="section-title">Información Personal</h2>
                        </div>
                        <div className="info-cards">
                            <div className="info-card">
                                <FaIdCard className="info-card-icon" />
                                <div className="info-card-label">Cédula</div>
                                <div className="info-card-value">{datos_personales.cedula}</div>
                            </div>
                            <div className="info-card">
                                <div className="info-card-label">Estado Civil</div>
                                <div className="info-card-value">{datos_personales.estado_civil || 'No especificado'}</div>
                            </div>
                            <div className="info-card">
                                <FaBirthdayCake className="info-card-icon" />
                                <div className="info-card-label">Fecha de Nacimiento</div>
                                <div className="info-card-value">{formatDate(datos_personales.fecha_nacimiento)}</div>
                            </div>
                            <div className="info-card">
                                <div className="info-card-label">Edad</div>
                                <div className="info-card-value">{datos_personales.edad} años</div>
                            </div>
                            {datos_personales.sexo && (
                                <div className="info-card">
                                    <FaVenusMars className="info-card-icon" />
                                    <div className="info-card-label">Sexo</div>
                                    <div className="info-card-value">{datos_personales.sexo === 'H' ? 'Hombre' : 'Mujer'}</div>
                                </div>
                            )}
                            {datos_personales.nacionalidad && (
                                <div className="info-card">
                                    <div className="info-card-label">Nacionalidad</div>
                                    <div className="info-card-value">{datos_personales.nacionalidad}</div>
                                </div>
                            )}
                            {datos_personales.lugar_nacimiento && (
                                <div className="info-card">
                                    <div className="info-card-label">Lugar de Nacimiento</div>
                                    <div className="info-card-value">{datos_personales.lugar_nacimiento}</div>
                                </div>
                            )}
                            {datos_personales.licencia_conducir && (
                                <div className="info-card">
                                    <FaCar className="info-card-icon" />
                                    <div className="info-card-label">Licencia de Conducir</div>
                                    <div className="info-card-value">{datos_personales.licencia_conducir}</div>
                                </div>
                            )}
                        </div>

                        <div className="section-card">
                            <h2 className="section-title">Datos de Contacto</h2>
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
                                {datos_personales.telefono_convencional && (
                                    <div className="personal-info-item">
                                        <strong>Teléfono Convencional:</strong>
                                        <span>{datos_personales.telefono_convencional}</span>
                                    </div>
                                )}
                                {datos_personales.telefono_fijo && (
                                    <div className="personal-info-item">
                                        <strong>Teléfono Fijo:</strong>
                                        <span>{datos_personales.telefono_fijo}</span>
                                    </div>
                                )}
                                <div className="personal-info-item">
                                    <strong>Dirección Domiciliaria:</strong>
                                    <span>{datos_personales.direccion}</span>
                                </div>
                                {datos_personales.direccion_trabajo && (
                                    <div className="personal-info-item">
                                        <strong>Dirección de Trabajo:</strong>
                                        <span>{datos_personales.direccion_trabajo}</span>
                                    </div>
                                )}
                                {datos_personales.sitio_web && (
                                    <div className="personal-info-item">
                                        <strong>Sitio Web:</strong>
                                        <span>{datos_personales.sitio_web}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {datos_personales.descripcion_perfil && (
                            <div className="section-card">
                                <h2 className="section-title">Perfil Profesional</h2>
                                <p className="profile-description">{datos_personales.descripcion_perfil}</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Formación Académica */}
                {shouldShowSection('formacion') && (
                    <div id="section-formacion" className="section-card fade-in">
                        <div className="print-header">
                            <h2 className="section-title">Formación Académica</h2>
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
                                {item.lugar_empresa && (
                                    <div className="item-location">
                                        <FaMapMarkerAlt size={12} /> {item.lugar_empresa}
                                    </div>
                                )}
                                {(item.fecha_inicio || item.fecha_fin) && (
                                    <div className="item-date">
                                        {formatDate(item.fecha_inicio)} - {formatDate(item.fecha_fin)}
                                    </div>
                                )}
                                {item.descripcion && <div className="item-description">{item.descripcion}</div>}
                                
                                {/* Información de contacto empresarial */}
                                {(item.email_empresa || item.sitio_web_empresa || item.nombre_contacto) && (
                                    <div className="item-contact-info">
                                        {item.nombre_contacto && (
                                            <span><strong>Contacto:</strong> {item.nombre_contacto}</span>
                                        )}
                                        {item.telefono_contacto && (
                                            <span><FaPhone size={10} /> {item.telefono_contacto}</span>
                                        )}
                                        {item.email_empresa && (
                                            <span><FaEnvelope size={10} /> {item.email_empresa}</span>
                                        )}
                                        {item.sitio_web_empresa && !isPrinting && (
                                            <a href={item.sitio_web_empresa} target="_blank" rel="noopener noreferrer">
                                                <FaGlobe size={10} /> Sitio Web
                                            </a>
                                        )}
                                    </div>
                                )}
                                
                                {item.ruta_certificado && !isPrinting && (
                                    <a
                                        href={item.ruta_certificado}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="certificate-link"
                                    >
                                        <FaCertificate /> Ver Certificado <FaExternalLinkAlt size={12} />
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Cursos y Certificaciones */}
                {shouldShowSection('cursos') && (
                    <div id="section-cursos" className="section-card fade-in">
                        <div className="print-header">
                            <h2 className="section-title">Cursos y Certificaciones</h2>
                        </div>

                        <div className="courses-grid">
                            {cursos && cursos.map((curso, index) => {
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
                                        {(curso.fecha_inicio || curso.fecha_fin) && (
                                            <div className="course-date">
                                                {formatDate(curso.fecha_inicio)} - {formatDate(curso.fecha_fin)}
                                            </div>
                                        )}
                                        {!curso.fecha_inicio && curso.fecha && (
                                            <div className="course-date">{formatDate(curso.fecha)}</div>
                                        )}
                                        {curso.total_horas && (
                                            <div className="course-hours">{curso.total_horas} horas</div>
                                        )}
                                        {curso.descripcion && (
                                            <div className="course-description">{curso.descripcion}</div>
                                        )}
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
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Reconocimientos */}
                {shouldShowSection('reconocimientos') && reconocimientos.length > 0 && (
                    <div id="section-reconocimientos" className="section-card fade-in">
                        <div className="print-header">
                            <h2 className="section-title">Reconocimientos</h2>
                        </div>

                        <div className="recognitions-grid">
                            {reconocimientos.map((rec, index) => (
                                <div key={index} className="recognition-card">
                                    <div className="recognition-header">
                                        <FaTrophy className="recognition-icon" />
                                        <span className="recognition-type">{rec.tipo_reconocimiento}</span>
                                    </div>
                                    <div className="recognition-description">{rec.descripcion}</div>
                                    {rec.entidad_patrocinadora && (
                                        <div className="recognition-sponsor">{rec.entidad_patrocinadora}</div>
                                    )}
                                    {rec.fecha_reconocimiento && (
                                        <div className="recognition-date">{formatDate(rec.fecha_reconocimiento)}</div>
                                    )}
                                    {rec.ruta_certificado && !isPrinting && (
                                        <a
                                            href={rec.ruta_certificado}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="certificate-link"
                                        >
                                            <FaCertificate /> Ver Certificado <FaExternalLinkAlt size={12} />
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Productos Académicos */}
                {shouldShowSection('productos_academicos') && productos_academicos.length > 0 && (
                    <div id="section-productos_academicos" className="section-card fade-in">
                        <div className="print-header">
                            <h2 className="section-title">Productos Académicos</h2>
                        </div>

                        <div className="products-grid">
                            {productos_academicos.map((prod, index) => (
                                <div key={index} className="product-card">
                                    <div className="product-name">{prod.nombre_recurso}</div>
                                    {prod.clasificador && (
                                        <div className="product-classifier">{prod.clasificador}</div>
                                    )}
                                    {prod.descripcion && (
                                        <div className="product-description">{prod.descripcion}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Productos Laborales */}
                {shouldShowSection('productos_laborales') && productos_laborales.length > 0 && (
                    <div id="section-productos_laborales" className="section-card fade-in">
                        <div className="print-header">
                            <h2 className="section-title">Productos Laborales</h2>
                        </div>

                        <div className="products-grid">
                            {productos_laborales.map((prod, index) => (
                                <div key={index} className="product-card">
                                    <div className="product-name">{prod.nombre_producto}</div>
                                    {prod.fecha_producto && (
                                        <div className="product-date">{formatDate(prod.fecha_producto)}</div>
                                    )}
                                    {prod.descripcion && (
                                        <div className="product-description">{prod.descripcion}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Referencias */}
                {shouldShowSection('referencias') && (
                    <div id="section-referencias" className="section-card fade-in">
                        <div className="print-header">
                            <h2 className="section-title">Referencias Personales</h2>
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

                {/* Venta Garage */}
                {shouldShowSection('ventas_garage') && ventas_garage.length > 0 && (
                    <div id="section-ventas_garage" className="section-card fade-in">
                        <div className="print-header">
                            <h2 className="section-title">Venta Garage</h2>
                        </div>

                        <div className="garage-grid">
                            {ventas_garage.map((item, index) => (
                                <div key={index} className="garage-card">
                                    <div className="garage-name">{item.nombre_producto}</div>
                                    {item.estado_producto && (
                                        <div className={`garage-state ${item.estado_producto.toLowerCase()}`}>
                                            Estado: {item.estado_producto}
                                        </div>
                                    )}
                                    {item.descripcion && (
                                        <div className="garage-description">{item.descripcion}</div>
                                    )}
                                    {item.valor_del_bien && (
                                        <div className="garage-price">${parseFloat(item.valor_del_bien).toFixed(2)}</div>
                                    )}
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
