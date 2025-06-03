import React from 'react';

export function Footer() {
  const footerStyle: React.CSSProperties = {
    backgroundColor: '#f8f9fa', // A light gray background, similar to Bootstrap's default light theme
    color: '#6c757d',          // A muted text color
    padding: '20px 0',
    textAlign: 'center',
    borderTop: '1px solid #e7e7e7', // A subtle top border
    marginTop: 'auto' // Pushes footer to bottom if content is short
  };

  const linkStyle: React.CSSProperties = {
    color: '#007bff', // Bootstrap primary color for links
    textDecoration: 'none',
    margin: '0 10px'
  };

  return (
    <footer style={footerStyle}>
      <div className="container"> {/* Optional: use Bootstrap container for consistent padding */}
        <p style={{ marginBottom: '0.5rem' }}>
          © 2025 Todos los derechos reservados.
        </p>
        <p style={{ marginBottom: '0.5rem' }}>
          <a href="mailto:info@yourstore.com" style={linkStyle}>info@mail.com</a> | 
          <span> Alem 1879</span>
        </p>
      </div>
    </footer>
  );
}
