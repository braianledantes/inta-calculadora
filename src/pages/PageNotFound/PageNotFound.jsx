import React from 'react';

const tractorImageUrl = 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80'; // Imagen de tractor

const PageNotFound = () => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        textAlign: 'center'
    }}>
        <h1>404 - Página no encontrada</h1>
        <p>Lo sentimos, la página que buscas no existe.</p>
        <img
            src={tractorImageUrl}
            alt="Tractor averiado"
            style={{ maxWidth: '300px', borderRadius: '12px', marginTop: '24px' }}
        />
    </div>
);

export default PageNotFound;