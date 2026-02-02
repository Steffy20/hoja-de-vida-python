import React from 'react';

const Sidebar = ({ datos, referencias }) => {
  if (!datos) return null;

  return (
    <aside className="sidebar">
      <div className="contact-info">
        <h2>Contacto</h2>
        <div className="contact-item">
          <strong>Teléfono</strong>
          {datos.telefono}
        </div>
        <div className="contact-item">
          <strong>Email</strong>
          <a href={`mailto:${datos.email}`}>{datos.email}</a>
        </div>
        <div className="contact-item">
          <strong>Dirección</strong>
          {datos.direccion}
        </div>
      </div>

      <div className="contact-info">
        <h2>Datos Personales</h2>
        <div className="contact-item">
          <strong>Cédula</strong>
          {datos.cedula}
        </div>
        <div className="contact-item">
          <strong>Estado Civil</strong>
          {datos.estado_civil}
        </div>
        <div className="contact-item">
          <strong>Fecha de Nacimiento</strong>
          {datos.fecha_nacimiento}
        </div>
        <div className="contact-item">
          <strong>Edad</strong>
          {datos.edad} años
        </div>
      </div>

      <div className="contact-info">
        <h2>Referencias</h2>
        {referencias.map((ref, index) => (
          <div key={index} className="contact-item" style={{ marginBottom: '15px' }}>
            <strong>{ref.nombre}</strong>
            <div>Telf: {ref.telefono}</div>
            {ref.email && <div>Email: {ref.email}</div>}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
