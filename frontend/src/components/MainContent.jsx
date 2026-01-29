import React from 'react';

const MainContent = ({ datos, formacion, experiencia }) => {
    return (
        <main className="main-content">
            <header className="header">
                {datos ? (
                    <>
                        <h1>{datos.nombres} {datos.apellidos}</h1>
                        <div className="subtitle">Perfil Profesional</div>
                    </>
                ) : (
                    <h1>Nombre Apellido</h1>
                )}
            </header>

            <section className="section">
                <h2 className="section-title">Formación Académica</h2>
                {formacion.length > 0 ? (
                    formacion.map((item, index) => (
                        <div key={index} className="item">
                            <div className="item-header">
                                <div className="item-title">{item.nivel}</div>
                                <div className="item-date">{item.estado}</div>
                            </div>
                            <div className="item-subtitle">{item.institucion}</div>
                            {item.titulo && <div className="item-description">{item.titulo}</div>}
                        </div>
                    ))
                ) : (
                    <p>No hay formación académica registrada.</p>
                )}
            </section>

            <section className="section">
                <h2 className="section-title">Experiencia Laboral</h2>
                {experiencia.length > 0 ? (
                    experiencia.map((item, index) => (
                        <div key={index} className="item">
                            <div className="item-header">
                                <div className="item-title">{item.cargo}</div>
                                <div className="item-date">
                                    {item.fecha_inicio ? `${item.fecha_inicio} - ${item.fecha_fin || 'Presente'}` : ''}
                                </div>
                            </div>
                            <div className="item-subtitle">{item.empresa}</div>
                            <div className="item-description">{item.descripcion}</div>
                        </div>
                    ))
                ) : (
                    <p>No hay experiencia laboral registrada.</p>
                )}
            </section>
        </main>
    );
};

export default MainContent;
